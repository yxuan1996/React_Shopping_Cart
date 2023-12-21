import { Outlet, NavLink, Link, useLoaderData, redirect, useNavigation, useSubmit} from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import {LinkContainer} from 'react-router-bootstrap'

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
    const [query, setQuery] = useState("");
    const navigation = useNavigation();
    const submit = useSubmit();

    // const searching =
    // navigation.location &&
    // new URLSearchParams(navigation.location.search).has(
    //   "q"
    // );

    // useEffect(() => {
    //   setQuery(q);
    // }, [q]);

    const handleSearch = (input) => {
        console.log('Search was made');
        console.log(input.target.value);
        setQuery(input.target.value);
        // const isFirstSearch = q == null;
        // submit(input.currentTarget.form, {
        //     replace: !isFirstSearch,
        // });
    }

    return (
      <>
        <Navbar bg="light" expand="lg" fixed="top">
        <Container>
            <LinkContainer to="/React_Shopping_Cart/">
                <Navbar.Brand>Shopping Cart</Navbar.Brand>
            </LinkContainer>
            
            <Nav className="mr-auto">
                <Form.Control id='q' name='q' type="text" placeholder="Search Here" onChange={(e) => {handleSearch(e);}}/>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Item>
                <LinkContainer to="/React_Shopping_Cart/">
                <Nav.Link>
                    <FontAwesomeIcon icon={faCartShopping} />   
                </Nav.Link>
                </LinkContainer>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Container className="main">
            <Outlet context={[query]}/>
        </Container>
    </>
    );
  }