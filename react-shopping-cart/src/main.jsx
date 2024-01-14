import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate, 
  useLocation
} from "react-router-dom";
import App from './App.jsx'
import Userfront, { SignupForm, LoginForm, PasswordResetForm } from "@userfront/toolkit/react";
import Dashboard from './routes/dashboard.jsx';
import Root from "./routes/root";
import ProductListPage, { loader as productLoader} from "./routes/productlist.jsx"
import SingleProductPage, { loader as singleProductLoader } from "./routes/singleproductpage.jsx"
import ShoppingCartPage from "./routes/shoppingcart.jsx"
import ErrorPage from "./error-page";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import '@fontsource/inter';


Userfront.init("5nxjxwrn");

function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/React_Shopping_Cart/login" state={{ from: location }} replace />;
  }

  return children;
}

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
          {
            path: "products/:productId",
            element: <SingleProductPage />,
            loader: singleProductLoader,
            // action: contactAction,
          },
          {
            path: "cart",
            element: <ShoppingCartPage />,
            loader : productLoader,
            // action: contactAction,
          },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "signup",
            element: <SignupForm />,
          },
          {
            path: "dashboard",
            element:  <RequireAuth>
              <Dashboard />
            </RequireAuth>,
          },
          {
            path: "reset_password",
            element: <PasswordResetForm />,
          },
          
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