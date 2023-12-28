// ProductListPage.js
import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit, useOutletContext} from "react-router-dom";
import React, {useState, useEffect, useReducer} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import { getProducts, } from "../product";
import StarRating from '../StarRating';
import { matchSorter } from "match-sorter";

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q") || "";
  const products = await getProducts("");
  return { products };
}

const ProductListPage = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const { products } = useLoaderData();
  const [productData, setProductData] = useState(products)
  const [currentItems, setCurrentItems ] = useState(productData)

  const itemsPerPage = 12;
  let totalPages = Math.ceil(products.length / itemsPerPage);
  let [activePage, setActivePage ] = useState(1);
  let PageItems = []
  for (let number = 1; number <= totalPages; number++) {
    PageItems.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  // Run during load
  useEffect(() => {
    // Display first page items only
    let indexOfLastItem = activePage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(productData.slice(indexOfFirstItem, indexOfLastItem))

  }, [])

  const {
    querytext: [query],
    cart: [cartItems, setCartItems],
  } = useOutletContext();
  console.log('This is the query')
  console.log(query)

  useEffect(() => {
    let data = matchSorter(productData, query, { keys: ["title"] });
    console.log('matchsorter')
    console.log(data)
    setCurrentItems(data)
    forceUpdate()
  }, [query])

  const navigation = useNavigation();
  const submit = useSubmit();

  

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    // Use pageNumber argument, not the activePage state
    let indexOfLastItem = pageNumber * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(productData.slice(indexOfFirstItem, indexOfLastItem))
    forceUpdate()
  };

  return (
    <>
    <Container>
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {currentItems.map((product) => (
        <Link to={`/React_Shopping_Cart/products/${product.id}`}>
        <Col key={product.id} style={{height: '26rem'}}>
          <Card className="h-100">
            <Card.Img variant="top" src={product.image} alt={product.title} className='h-50'/>
            <Card.Body >
              <Card.Title className="overflow-hidden" style={{height: '6rem'}}>{product.title}</Card.Title>
              <Card.Text className="h-auto">Price: ${product.price}</Card.Text>
              {/* <Card.Text className="h-auto">Rating: {product.rating.rate}</Card.Text> */}
              <StarRating rating={product.rating.rate} />
            </Card.Body>
          </Card>
        </Col>
        </Link>
      ))}
    </Row>
    </Container>
    <Container style={{ display: "flex", justifyContent: "center" }} className="my-4">
      <Pagination>{PageItems}</Pagination>
    </Container>
    </>
  );
};

export default ProductListPage;
