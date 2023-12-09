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


### API
#### Product API
We will be using the fake store API to obtain sample product data for our store. 

https://fakestoreapi.com/docs

