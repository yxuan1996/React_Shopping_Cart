// SingleProductPage.js
import React from 'react';
import { Form, useLoaderData, useFetcher, } from "react-router-dom";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { getProduct, } from "../product";
import StarRating from '../StarRating';


export async function loader({ params }) {
  const product = await getProduct(params.productId);
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { product };
}

const SingleProductPage = () => {
  const { product } = useLoaderData();
  console.log(product)


  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        {/* Product Image on Left (Desktop View) */}
        <Col md={6} lg={4} className="mb-3 mb-md-0">
          <Image src={product.image} alt="Product Image" fluid />
        </Col>

        {/* Product Details on Right (Desktop View) */}
        <Col md={6} lg={8}>
          <h2>{product.title}</h2>
          <StarRating rating={product.rating.rate} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>

      {/* Product Image on Top (Mobile View) */}
      {/* <Row className="d-md-none">
        <Col>
          <Image src="https://placekitten.com/400/300" alt="Product Image" fluid />
        </Col>
      </Row> */}

      {/* Product Details on Bottom (Mobile View) */}
      {/* <Row className="d-md-none">
        <Col>
          <h2>Product Name</h2>
          <p>Product Description goes here...</p>
          <p>Price: $19.99</p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row> */}
    </Container>
  );
};

export default SingleProductPage;
