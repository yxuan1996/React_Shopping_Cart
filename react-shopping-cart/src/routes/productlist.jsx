// ProductListPage.js
import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit} from "react-router-dom";
import React, {useState, useEffect, useReducer} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import { getProducts, } from "../product";

export async function loader({ request }) {
  const url = new URL(request.url);
  // const q = url.searchParams.get("q") || "";
  const products = await getProducts();
  return { products };
}

const ProductListPage = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const { products } = useLoaderData();

  const itemsPerPage = 12;
  let totalPages = Math.ceil(products.length / itemsPerPage);

  let [activePage, setActivePage ] = useState(1);

  // Run during first load
    let indexOfLastItem = activePage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let [currentItems, setCurrentItems ] = useState(products.slice(indexOfFirstItem, indexOfLastItem))

    let PageItems = []
    for (let number = 1; number <= totalPages; number++) {
      PageItems.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>,
      );
    }


  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    // Use pageNumber argument, not the activePage state
    let indexOfLastItem = pageNumber * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem))
    // forceUpdate()
  };

  return (
    <>
    <Container>
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {currentItems.map((product) => (
        <Col key={product.id} style={{height: '26rem'}}>
          <Card className="h-100">
            <Card.Img variant="top" src={product.image} alt={product.title} className='h-50'/>
            <Card.Body >
              <Card.Title className="overflow-hidden" style={{height: '6rem'}}>{product.title}</Card.Title>
              <Card.Text className="h-auto">Price: ${product.price}</Card.Text>
              <Card.Text className="h-auto">Rating: {product.rating.rate}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
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
