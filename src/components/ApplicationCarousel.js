import React from "react";
import { Carousel, Container } from "react-bootstrap";

const ApplicationCarousel = () => {
  return (
    <Container fluid className="mt-5 mb-5 px-0">
      <Carousel interval={10000}>
        {/* Heavy Equipment */}
        <Carousel.Item className="photoCarItem">
          <img
            src="/images/heavyequipment.png"
            alt="Heavy Equipment"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <Carousel.Caption className="photoCarText">
            <h1>HEAVY EQUIPMENT</h1>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Industrial Automation */}
        <Carousel.Item className="photoCarItem">
          <img
            src="/images/industrialautomation.png"
            alt="Industrial Automation"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <Carousel.Caption className="photoCarText">
            <h1>INDUSTRIAL AUTOMATION</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Entertainment */}
        <Carousel.Item className="photoCarItem">
          <img
            src="/images/entertainment.png"
            alt="Entertainment"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <Carousel.Caption className="photoCarText">
            <h1>ENTERTAINMENT</h1>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Medical Devices */}
        <Carousel.Item className="photoCarItem">
          <img
            src="/images/medicaldevices.png"
            alt="Medical Devices"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <Carousel.Caption className="photoCarText">
            <h1>MEDICAL DEVICES</h1>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ApplicationCarousel;
