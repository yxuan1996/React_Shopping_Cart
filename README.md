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


### API
#### Product API
We will be using the fake store API to obtain sample product data for our store. 

https://fakestoreapi.com/docs

