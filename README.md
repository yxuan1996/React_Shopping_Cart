# React_Shopping_Cart

We will be building a Simple E-commerce website with a shopping cart using React. 

Tools / Libraries used:
- Vite as build tool
- React Router
- React Bootstrap as the main UI library
- JOY UI as UI library
- Stripe for Payments

To run the app:
```
cd react-shopping-cart
npm install
npm run dev
```

### Installed Libaries
React Router
```
npm install react-router-dom localforage match-sorter sort-by
```

React Bootstrap
```
npm install react-bootstrap bootstrap
```

Joy UI
```
npm install @mui/joy @emotion/react @emotion/styled
```

Install Fonts
```
npm install @fontsource/inter
```

Install Font Awesome Icons
https://origin.fontawesome.com/v5/docs/web/use-with/react
```
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
```

Install React Icons

https://react-icons.github.io/react-icons/
```
npm install react-icons --save
```

## Development Notes
### UI
#### Sticky Header
We are using React Bootstrap for styling. To implement sticky header, we set `fixed="top"` to the Navbar component. 

After that, we need to offset the Navbar height. In the Container that contains our Outlet, we set the following CSS properties:
```CSS
.main:before {
  height: 3rem;
  content: "";
  display:block;
}
```

#### Client Side Routing
React Bootstrap Navbar uses `<a>` links for traditional server side routing. We want to use React Router Client Side Routing instead. 

We install the `react-router-bootstrap` library

```
npm i react-router-bootstrap
```

All we need to do is to is wrap our React Bootstrap element in a `<LinkContainer>`. 

We define our path in the LinkContainer and remove the original href.

```JSX
import {LinkContainer} from 'react-router-bootstrap'

<LinkContainer to="/service">
    <Nav.Link>Service</Nav.Link>
</LinkContainer>
```


#### Pagination
To implement pagination, we need to first define the maximum number of items that can be loaded in a page.
`productlist.jsx`
```JSX
  const itemsPerPage = 12;
  let totalPages = Math.ceil(products.length / itemsPerPage);
```

We use states to keep track of
- Active Page
- Items to be displayed on the page
```JSX
let [activePage, setActivePage ] = useState(1);

  // Run during first load
    let indexOfLastItem = activePage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let [currentItems, setCurrentItems ] = useState(products.slice(indexOfFirstItem, indexOfLastItem))
```

We add the number of pages we have to the Pagination.Item Component
```JSX
    let PageItems = []
    for (let number = 1; number <= totalPages; number++) {
      PageItems.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>,
      );
    }
```

In our display, we iterate through the filtered Items to be displayed state, instead of the entire product list. 

We display the Pagination component at the bottom of the page. 
```JSX
<Container style={{ display: "flex", justifyContent: "center" }} className="my-4">
      <Pagination>{PageItems}</Pagination>
</Container>
```

- When a page item is clicked, we use a handler function to update the states. 
- Note that we should use the `pageNumber` argument for calculations and not the `activePage` state, since state updates are async and take time to update. This means that we will still refer to the previous `activePage` state, our list of items remains unchanged and the page won't update. 
```JSX
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    let indexOfLastItem = pageNumber * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem))
  };
```


#### Product Search
We want to implement a searchbar that searches as we type. 

In `root.jsx` we introduce a new state to keep track of our search queries
```JSX
const [query, setQuery] = useState("");
```

In the Navbar we set the searchbar as a React-Bootstrap Form, and attach an event handler to it. The event handler is triggered whenever something is typed and updated the query state. 

The `query` state is passed to child components as a prop using the `Context Outlet`

In the `productlist.jsx` child component, we retrieve the `query` state using `useOutletContext()`

Lastly, we use a `useEffect()` hook. By setting the `query` state as a dependency, this function will run whenever there is a state change. The function uses the `matchSorter` library to perform fuzzy matching and filter for items, then updates the `currentItem` state with the filtered items, thereby forcing a re-render. 

```JSX
useEffect(() => {
    let data = matchSorter(productData, query, { keys: ["title"] });
    console.log('matchsorter')
    console.log(data)
    setCurrentItems(data)
    forceUpdate()
  }, [query])
```

#### Star Rating
To display our numerical ratings as stars, we will create our own star rating component in `StarRating.jsx`

In the Star Rating Component:
- We use the `react-icons` library to get our star icons. 
- The component takes in a numerical rating as a parameter. 
- We calculate how many filled stars and unfilled stars need to be displayed (total 5 stars)

We then import the component in `productlist.jsx` and `singleproductpage.jsx`

#### Shopping Cart
We want to implement a Shopping Cart that allows users to add items into the cart. 

In `root.jsx` we introduce a new state to keep track of our cart items
```JSX
const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('Cart')) || []);
```

We use `Outlet context` to pass the state as a prop to child components. 

In `singleproductpage.jsx`,  we create a button that allows us to add the current product to cart. 

When the Add To Cart button is clicked
- We check if the product already exists in the cart or not
- If the product already exists in the cart, increment the quantity
- If the product does not exist, add it with a quantity of 1
- Save the cart state to localstorage
- Show the 'added to cart' alert

In `shoppingcart.jsx` we create our shopping cart page that displays a summary of all the items in our shopping cart. 

We define the following functions
- `getProductInfo` - Since cartItems only has the product id, we need to use to function to look up other product attributes, such as price, product image etc. 
- `calculateTotalPrice` - Calculate Total Price for a single item. 
- `calculateGrandTotal` - Calculate the Grand Total. Add $20 delivery fee. 
- `handleRemoveFromCart` - Remove the selected item from the cart, and update the cartItem state. Save the cart state to localstorage. 

### API
#### Product API
We will be using the fake store API to obtain sample product data for our store. 

https://fakestoreapi.com/docs

