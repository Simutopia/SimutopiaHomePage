import { Card, Row, Col, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCogs, faHourglass, faLaptop, faProjectDiagram, faRetweet } from '@fortawesome/free-solid-svg-icons';

const Services = ({}) => {
  return (
    <>
      <Container
        fluid
        className="p-0 d-flex justify-content-center align-items-center sectionTitle"
        id="servicesTarget"
      >
        <h1 className="display-1 my-1">SERVICES</h1>
      </Container>

      <Container fluid id="servicesContainer" className="my-0 py-5">
        <Row className="d-flex justify-content-around w-100 mx-0">
          {/* Digital Twin Modeling */}
          <Col lg={true} className="mb-4">
            <Card className="servicesCard h-100 py-4">
              <Card.Body>
                <h1 className="display-1 justify-content-center d-flex">
                <FontAwesomeIcon icon={faCogs} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Digital Twin Modeling
                </h3>
                <hr />
                <ListGroup variant="flush">
                  <ListGroup.Item className="servicesListItem">
                    Develop models describing dynamic behavior of physical
                    systems involving multiple domains utilizing both first
                    principles and data-driven approaches
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Model fault dynamics to study the impact of failures at both
                    component and subsystem levels on the behavior of the
                    overall system
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Create reduced order models that can be deployed in
                    real-time control applications
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Expertise in creating plant models using{" "}
                    <a
                      href="https://www.mathworks.com/products/simulink.html?s_tid=hp_products_simulink"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simulink<sup>&reg;</sup>
                    </a>
                    ,{" "}
                    <a
                      href="https://www.mathworks.com/products/simscape.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simscape<sup>&trade;</sup>
                    </a>
                    , and{" "}
                    <a
                      href="https://www.mathworks.com/products/simmechanics.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simscape
                      <sup>&trade;</sup> Multibody<sup>&trade;</sup>
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Control Systems Modeling */}
          <Col lg={true} className="mb-4">
            <Card className="servicesCard h-100 py-4">
              <Card.Body>
                <h1 className="display-1 justify-content-center d-flex">
                <FontAwesomeIcon icon={faRetweet} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Control Systems Modeling
                </h3>
                <hr />
                <ListGroup variant="flush">
                  <ListGroup.Item className="servicesListItem">
                    Develop closed-loop system models comprising plant dynamics
                    and controller subsystems to design and analyze the
                    controller behavior
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Create supervisory control logic using state machines
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Develop and test advanced motor control strategies for
                    motion control applications
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Expertise in using{" "}
                    <a
                      href="https://www.mathworks.com/products/simcontrol.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simulink
                      <sup>&reg;</sup> Control Design<sup>&trade;</sup>
                    </a>
                    ,{" "}
                    <a
                      href="https://www.mathworks.com/products/sysid.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      System Identification Toolbox<sup>&trade;</sup>
                    </a>
                    , and{" "}
                    <a
                      href="https://www.mathworks.com/products/stateflow.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Stateflow
                      <sup>&reg;</sup>
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Generate embeddable controls software using{" "}
                    <a
                      href="https://www.mathworks.com/products/simulink-coder.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simulink
                      <sup>&reg;</sup> Coder<sup>&trade;</sup>
                    </a>{" "}
                    toolchain
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Training Simulators */}
          <Col lg={true} className="mb-4">
            <Card className="servicesCard h-100 py-4">
              <Card.Body>
                <h1 className="display-1 justify-content-center d-flex">
                  <FontAwesomeIcon icon={faProjectDiagram} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Training Simulators
                </h3>
                <hr />
                <ListGroup variant="flush">
                  <ListGroup.Item className="servicesListItem">
                    Develop dynamic physical system models, including fault
                    behaviors, and simulate them in pseudo-real time for
                    deployment within simulator platforms
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Integrate dynamic models within 3D visualization
                    envrionments such as{" "}
                    <a
                      href="https://unity.com/"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Unity<sup>&reg;</sup>
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.unrealengine.com/en-US/"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Unreal Engine
                      <sup>&reg;</sup>
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-around w-100 mx-0">
          {/* Real-Time Simulation */}
          <Col lg={true} className="mb-4">
            <Card className="servicesCard h-100 py-4">
              <Card.Body>
                <h1 className="display-1 justify-content-center d-flex">
                  <FontAwesomeIcon icon={faHourglass} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Real-Time Simulation & Testing
                </h3>
                <hr />
                <ListGroup variant="flush">
                  <ListGroup.Item className="servicesListItem">
                    Develop and deploy control subsystem models using
                    Processor-in-the-loop (PIL) framework for rapid control
                    prototyping
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Develop and deploy virtual plant models using
                    Hardware-in-the-Loop (HIL) framework for automated testing
                    of embedded controls software
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Expertise in working with{" "}
                    <a
                      href="https://www.mathworks.com/products/simulink-real-time.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simulink<sup>&reg;</sup> Real-Time
                      <sup>&trade;</sup>
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.speedgoat.com/"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Speedgoat
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Expertise in working with{" "}
                    <a
                      href="https://www.beckhoff.com/en-us/products/automation/twincat/te1xxx-twincat-3-engineering/te1410.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Beckhoff<sup>&reg;</sup> MATLAB
                      <sup>&reg;</sup> Suite
                    </a>{" "}
                    (TE1400, TE1401 & TE1410) for deploying{" "}
                    <a
                      href="https://www.mathworks.com/products/simulink.html?s_tid=hp_products_simulink"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Simulink<sup>&reg;</sup>
                    </a>{" "}
                    models on{" "}
                    <a
                      href="https://www.beckhoff.com/en-us/"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      Beckhoff
                      <sup>&reg;</sup>
                    </a>{" "}
                    PLCs
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Application Development */}
          <Col lg={true} className="mb-4">
            <Card className="servicesCard h-100 py-4">
              <Card.Body>
                <h1 className="display-1 justify-content-center d-flex">
                  <FontAwesomeIcon icon={faLaptop} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">
                  Application Development
                </h3>
                <hr />
                <ListGroup variant="flush">
                  <ListGroup.Item className="servicesListItem">
                    Develop graphical user interface (GUI) applications using{" "}
                    <a
                      href="https://www.mathworks.com/products/matlab/app-designer.html"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      MATLAB<sup>&reg;</sup> App Designer
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Develop Apps that can run within{" "}
                    <a
                      href="https://www.mathworks.com/products/matlab.html?s_tid=hp_products_matlab"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      MATLAB<sup>&reg;</sup>
                    </a>
                    environment or as a compiled standalone executable
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Data Analysis */}
          <Col lg={true} className="mb-4">
            <Card className="servicesCard h-100 py-4">
              <Card.Body>
                <h1 className="display-1 justify-content-center d-flex">
                  <FontAwesomeIcon icon={faChartBar} />
                </h1>
                <hr />
                <h3 className="justify-content-center d-flex">Data Analysis</h3>
                <hr />
                <ListGroup variant="flush">
                  <ListGroup.Item className="servicesListItem">
                    Leverage built-in{" "}
                    <a
                      href="https://www.mathworks.com/products/matlab.html?s_tid=hp_products_matlab"
                      target="_blank"
                      style={{ textDecorationLine: "none" }}
                    >
                      MATLAB<sup>&reg;</sup>
                    </a>{" "}
                    functions and create custom tools for statistical analysis,
                    machine learning, and signal processing
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Simulate plant models in both nominal and fault modes to
                    synthesize data for machine learning applications
                  </ListGroup.Item>
                  <ListGroup.Item className="servicesListItem">
                    Use parallel computing techniques for solving
                    computationally and data intensive problems
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className="p-0"
        style={{ backgroundColor: "rgb(94, 96, 99)", height: "80px" }}
      ></Container>
    </>
  );
};

export default Services;
