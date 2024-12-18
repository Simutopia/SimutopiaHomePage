import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="px-2 py-2 my-0" id="footer">
      <Row className="mx-2">
        {/* USA Office Details */}
        <Col className="pt-2" xs={12} lg={2}>
          <h3 className="m-0">
            <u>USA Office</u>
          </h3>
          <h6 className="m-0">17221 Broadoak Dr.</h6>
          <h6 className="m-0">Tampa, FL 33647</h6>
        </Col>

        {/* India Office Details */}
        <Col className="pt-2">
          <h3 className="m-0">
            <u>India Office</u>
          </h3>
          <h6 className="m-0">4-60-5/4/1, Lawsons Bay Colony</h6>
          <h6 className="m-0">Visakhapatnam, Andhra Pradesh 530017</h6>
        </Col>
      </Row>

      {/* Footer Copyright */}
      <Row className="pt-5 mx-0">
        {/* <h5 className="m-0">&copy; 2020-2024 Simutopia, LLC.</h5> */}
        {/* change the number on copy right to be automatic with JS */}
        <h5 className="m-0">&copy; 2020-{new Date().getFullYear()} Simutopia, LLC.</h5>
      </Row>
    </Container>
  );
};

export default Footer;
