import { faAngleDoubleDown, faArrowDown, faCompressArrowsAlt, faSearch,  faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Row, Col, Container } from "react-bootstrap";

const WhySim = ({}) => {
  return (
    <>
      <Container
        fluid
        className="p-0"
        style={{ backgroundColor: "rgb(94, 96, 99)", height: "80px" }}
      ></Container>
      <Container
        fluid
        className="d-flex align-items-center"
        style={{ backgroundColor: "rgb(94, 96, 99)", color: "white" }}
      >
        <Row className="d-flex justify-content-around w-80 mx-0">
          <h1 className="display-3" style={{ textAlign: "center" }}>
            Why use <b>SIMULATION</b> and <b>ANALYSIS</b>?
          </h1>

          <h1 style={{ textAlign: "center" }} className="display-4">
            {/* <i className="fas fa-arrow-down"></i> */}
            <FontAwesomeIcon icon={faArrowDown} />
          </h1>

          <h2 style={{ textAlign: "center" }} className="m-0">
            understand the <b>DYNAMIC BEHAVIOR</b> of the <b>SYSTEM</b>
          </h2>
          <h1 className="display-2 mt-2 mb-3" style={{ textAlign: "center" }}>
            +
          </h1>

          {/* Risk Identification */}
          <Col lg={true} className="mb-4">
            <Card className="whySimCard h-100">
              <Card.Body className="py-5">
                <h1 className="display-1 justify-content-center d-flex">
                  {/* <i className="fas fa-search"></i> */}
                  <FontAwesomeIcon icon={faSearch} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Identify system level risks early in design
                </h3>
              </Card.Body>
            </Card>
          </Col>

          {/* Requirements Traceability */}
          <Col lg={true} className="mb-4">
            <Card className="whySimCard h-100">
              <Card.Body className="py-5">
                <h1 className="display-1 justify-content-center d-flex">
                  {/* <i className="fas fa-compress-arrows-alt"></i> */}
                  <FontAwesomeIcon icon={faCompressArrowsAlt} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Increase traceability of the design requirements
                </h3>
              </Card.Body>
            </Card>
          </Col>

          {/* Minimize Prototypes */}
          <Col lg={true} className="mb-4">
            <Card className="whySimCard h-100">
              <Card.Body className="py-5">
                <h1 className="display-1 justify-content-center d-flex">
                  {/* <i className="fas fa-angle-double-down"></i> */}
                  <FontAwesomeIcon icon={faAngleDoubleDown} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Minimize physical prototyping and field testing
                </h3>
              </Card.Body>
            </Card>
          </Col>

          {/* Team Collaboration */}
          <Col lg={true} className="mb-4">
            <Card className="whySimCard h-100">
              <Card.Body className="py-5">
                <h1 className="display-1 justify-content-center d-flex">
                  {/* <i className="fas fa-users"></i> */}
                  <FontAwesomeIcon icon={faUsers} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Improve collaboration across disciplines and perform system
                  integration
                </h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        style={{ backgroundColor: "rgb(94, 96, 99)", height: "80px" }}
      ></Container>
    </>
  );
};

export default WhySim;
