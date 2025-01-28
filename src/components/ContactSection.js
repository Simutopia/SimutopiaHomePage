import { Row, Container } from "react-bootstrap";

const ContactSection = () => {
  return (
    <>
      <Container
        fluid
        className="p-0 contactContainer d-flex flex-column justify-content-center"
        id="contactTarget"
        style={{ height: "95vh" }}
      >
        <Container
          fluid
          className="p-0"
          style={{
            zIndex: "0",
            position: "absolute",
            overflow: "hidden",
            height: "95vh",
          }}
        >
          <img
            className="landingImage"
            src="/images/simulinkBackgroundBW.png"
            alt="Background"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Container>

        <Container
          fluid
          className="p-0"
          style={{ zIndex: "1", position: "absolute" }}
        >
          <Row className="pb-4 m-0 d-flex justify-content-center">
            <h1 className="display-2" id="contactQuestion">
              Ready to talk more about <br /> simulation and analysis?
            </h1>
          </Row>
          <Row className="py-2 m-0 d-flex justify-content-center">
            <h2 className="display-5" id="contactEmail">
              <a
                href="mailto:consulting@simutopia.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <i className="far fa-envelope"></i> consulting@simutopia.com
              </a>
            </h2>
          </Row>
          <Row className="py-3 m-0 d-flex justify-content-center">
            <h2 className="display-5" id="contactNumber">
              <a
                href="tel:+17742078005"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <i className="fas fa-phone"></i> <u>USA Office</u> <br /> (+1)
                774-207-8005
              </a>
            </h2>
          </Row>
          <Row className="py-3 m-0 d-flex justify-content-center">
            <h2 className="display-5" id="contactNumber">
              <a
                href="tel:+918977641377"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <i className="fas fa-phone"></i> <u>India Office</u>
                <br /> (+91) 897-764-1377
              </a>
            </h2>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ContactSection;