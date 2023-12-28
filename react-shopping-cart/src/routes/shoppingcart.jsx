import React,  {useState, useEffect, useReducer}  from 'react';
import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit, useOutletContext} from "react-router-dom";
import { Container, Table, Image, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

const ShoppingCartPage = () => {

const {
    querytext: [query],
    cart: [cartItems, setCartItems],
    } = useOutletContext();

const [showAlert, setShowAlert] = useState(false);

const { products } = useLoaderData();
console.log(products)
  // Function to get product information based on product ID
  const getProductInfo = (productId) => {
    return products.find((product) => product.id === productId);
  };

  // Function to calculate total price for an item
  const calculateTotalPrice = (item) => {
    const product = getProductInfo(item.productId);
    return item.quantity * product.price;
  };

  // Function to calculate the grand total
  const calculateGrandTotal = () => {
    const cartTotal = cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);
    return cartTotal + 20; // Assuming $20 delivery fee
  };

  const handleRemoveFromCart = (productId) => {
    // Filter out the item with the given productId
    const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('Cart', JSON.stringify(cartItems));
  };

  const handleCheckout = () => {
    setShowAlert(true);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);

      // Clear the Shopping Cart
      setCartItems([]);
      localStorage.setItem('Cart', JSON.stringify(cartItems));
    }, 3000);

  };

  useEffect(() => {
    // Cleanup the timer if the component unmounts
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <Container className="mt-4">
    {cartItems.length ? (
      <div>
      <Alert key='success' variant='success' show={showAlert} dismissible onClose={() => setShowAlert(false)}>
          Checkout Successful!
      </Alert>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Image</th>
            <th>Total Quantity</th>
            <th>Item Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td><Image src={getProductInfo(item.productId).image} alt="Product Image" style={{ width: '80px', height: '80px' }} fluid /></td>
              <td>{item.quantity}</td>
              <td>{getProductInfo(item.productId).price}</td>
              <td>{calculateTotalPrice(item)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.productId)}>
                  Remove from Cart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Delivery Fee</td>
            <td>$20.00</td>
          </tr>
          <tr>
            <td colSpan="3">Grand Total</td>
            <td>{calculateGrandTotal()}</td>
          </tr>
        </tfoot>
      </Table>

      <Button variant="success" onClick={() => handleCheckout()}>
          Proceed to Checkout
      </Button>

      </div>
      
    
    ) : (
      <p>
        <i>Your Cart is Empty, why not add some items?</i>
      </p>
    )}
    </Container>

   
  );
};

export default ShoppingCartPage;
