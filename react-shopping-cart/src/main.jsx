import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Root from "./routes/root";
import ProductListPage, { loader as productLoader} from "./routes/productlist.jsx"
import ErrorPage from "./error-page";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import '@fontsource/inter';


const router = createBrowserRouter([
  {
    path: "/React_Shopping_Cart/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, 
            element: <ProductListPage />,
            loader : productLoader,
          },
    //       {
    //         path: "contacts/:contactId",
    //         element: <Contact />,
    //         loader: contactLoader,
    //         action: contactAction,
    //       },

        ],
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)