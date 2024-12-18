import { Row, Container } from "react-bootstrap";

const BrandStatement = () => {
  return (
    <>
      <Container
        fluid
        className="p-0 d-flex flex-column justify-content-center"
        style={{ height: "80vh" }}
      >
        <Container
          fluid
          className="p-0"
          style={{
            zIndex: "0",
            position: "absolute",
            overflow: "hidden",
            height: "80vh",
          }}
        >
          <img
            className="landingImage"
            src="/images/simulinkBackgroundBW.jpeg"
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
          <Container
            fluid
            className="pb-4 pt-3 px-0"
            style={{
              width: "fit-content",
              backgroundColor: "rgba(255,255,255,1)",
            }}
          >
            <Container className="d-flex justify-content-center px-4 mb-3">
              <Row
                className="m-0 d-flex justify-content-center"
                style={{ width: "fit-content" }}
              >
                <img
                  className="fullLogo"
                  src="/images/simutopiaLogoWithReg.png"
                  alt="Simutopia Logo"
                  width={600}
                  height={158}
                />
              </Row>
            </Container>

            <Row className="m-0 d-flex justify-content-center align-items-start">
              <h3 className="m-0" id="missionStatement">
                ADVANCING <br /> <b>DESIGN AND INNOVATION</b>
                <br />
                THROUGH <br /> <b>SIMULATION AND ANALYSIS</b>
              </h3>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default BrandStatement;
