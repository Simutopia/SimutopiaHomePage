import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const AboutUs = () => {
  return (
    <>
      <Container fluid className="px-0 py-0 my-0" id="aboutUsTarget">
        {/* Section Title */}
        <Container
          fluid
          className="d-flex justify-content-center align-items-center sectionTitle"
        >
          <h1 className="display-1 my-1">ABOUT US</h1>
        </Container>

        {/* Krishna's Section */}
        <Row className="mx-0">
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12 }}
            lg={{ span: 4 }}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/krishnaPicture.JPG"}
              alt="Krishna Tamminana"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="pt-2 px-3 mb-0">Krishna Tamminana</h1>
            <hr />
            <ListGroup className="pb-4" variant="flush">
              <ListGroup.Item className="pt-1">
                Krishna is the President and Founder of Simutopia<sup>&reg;</sup>. He holds a B.Tech degree in Mechanical Engineering from IIT Madras (2003), an M.S.M.E degree from The Ohio State University (2005) and has 18+ years of experience in engineering, simulation, and analysis.
                <br />
                <br />
                At MathWorks, Krishna worked with clients in their adoption of a model-based design approach, primarily, in modeling multi-domain physical systems for controls design. Industries served include Automotive, Aerospace, Industrial Machinery, and Medical Devices.
                <br />
                <br />
                At Manitowoc Cranes R&D, Krishna played a key role in the development of a hardware-in-the-loop simulation platform for automated testing of controls software.
                <br />
                <br />
                At Walt Disney Imagineering, Krishna was responsible for developing a digital animation tools pipeline for the creation of Animatronic figures. He worked on system integration of several figures in attractions including Frozen Ever After and Star Wars: Galaxy's Edge. He also led the development of dynamic simulation models of track-based and trackless ride systems, including automated guided vehicles, for motion analysis and control systems design.
                <br />
                <br />
                Krishna enjoys playing badminton, biking with his kids, and watching movies.
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/* Divider */}
        <hr
          style={{
            height: "5px",
            backgroundColor: "#212529",
            opacity: "0.6",
            marginTop: "0",
            marginBottom: "0",
            border: "none",
          }}
        />

        {/* Gabriel's Section */}
        <Row className="mx-0">
          <Col
            className="d-flex flex-column justify-content-center"
            xs={{ span: 12, order: 2 }}
            lg={{ span: 8, order: 1 }}
          >
            <h1 className="pt-2 px-3 mb-0" style={{ textAlign: "end" }}>
              Gabriel King
            </h1>
            <hr />
            <ListGroup className="pb-4" variant="flush" style={{ textAlign: "end" }}>
              <ListGroup.Item className="pt-1">
                Gabriel is the Lead Engineer for Simutopia<sup>&reg;</sup>. He holds a B.S. in Mechanical Engineering from the University of Central Florida (2015) and has 9+ years of experience in engineering.
                <br />
                <br />
                Prior to his engineering career, Gabriel spent 6 years working as a technician at an automotive shop, working on everything from custom-built high horsepower drag race engines to replacing brake pads on a 15-year-old commuter car.
                <br />
                <br />
                At Walt Disney Parks & Resorts, Gabriel created systems-level ride timing and capacity simulations for early concept and in-production theme park attractions. He used MATLAB to design dynamic simulations of ride vehicles to support ride design. He was also part of the ride controls development and testing of a trackless ride system, including instrumented testing to characterize vehicle performance, failure responses, and navigation algorithms.
                <br />
                <br />
                Gabriel worked as a Project Engineer for Dreamscape Immersive on location-based Virtual Reality experiences. He was responsible for designing and manufacturing the physical elements to make a virtual world come to life.
                <br />
                <br />
                As a Systems Engineer for Walt Disney Imagineering, Gabriel designed and executed extensive ride vehicle tests to support the turnover and opening of Star Wars: Rise of the Resistance. He also worked on the Systems design of a new attraction to ensure guest safety was achieved, the Creative intent was met, and that the Mechanical, Electrical, and Controls designs would integrate into a functional attraction.
                <br />
                <br />
                When he's not working on building a new dynamic simulation, Gabriel enjoys Mountain Biking, Philosophy, woodworking, and sports cars.
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12, order: 1 }}
            lg={{ span: 4, order: 2 }}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/gabePicture.jpg"}
              alt="Gabriel King"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* Final Divider */}
      <hr
        style={{
          height: "10px",
          backgroundColor: "#212529",
          opacity: "0.6",
          marginTop: "0",
          marginBottom: "0",
          border: "none",
        }}
      />
    </>
  );
};

export default AboutUs;
