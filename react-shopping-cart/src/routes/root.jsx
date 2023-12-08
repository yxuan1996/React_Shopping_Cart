import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit} from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q") || "";
//   const contacts = await getContacts(q);
//   return { contacts, q };
// }

// export async function action() {
//   const contact = await createContact();
//   return redirect(`/contacts/${contact.id}/edit`);
// }

export default function Root() {
    // const { contacts, q } = useLoaderData();
    // const [query, setQuery] = useState(q);
    // const navigation = useNavigation();
    // const submit = useSubmit();

    // const searching =
    // navigation.location &&
    // new URLSearchParams(navigation.location.search).has(
    //   "q"
    // );

    // useEffect(() => {
    //   setQuery(q);
    // }, [q]);

    return (
      <>
        <Navbar bg="light" expand="lg" fixed="top">
        <Container>
            <Navbar.Brand href="/">Shopping Cart</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
                <Nav.Item>
                <Nav.Link href="/">
                    <FontAwesomeIcon icon={faCartShopping} />   
                </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Container className="main">
            <Outlet />
        </Container>
    </>
    );
  }