// ProductListPage.js
import { Outlet, NavLink, Link, useLoaderData, Form, redirect, useNavigation, useSubmit} from "react-router-dom";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getProducts, } from "../product";

export async function loader({ request }) {
  const url = new URL(request.url);
  // const q = url.searchParams.get("q") || "";
  const products = await getProducts();
  return { products };
}

const ProductListPage = () => {
  const { products } = useLoaderData();
  return (
    <>
    <Container>
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {products.map((product) => (
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
    </>
  );
};

export default ProductListPage;
