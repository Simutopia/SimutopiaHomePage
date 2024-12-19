import { Container, Row, Col, ListGroup } from "react-bootstrap";

const Industries = () => {
  return (
    <>
      <Container fluid className="px-0 py-0 my-0" id="industriesTarget">
        <Container
          fluid
          className="d-flex justify-content-center align-items-center sectionTitle"
        >
          <h1 className="display-1 my-1">INDUSTRIES</h1>
        </Container>

        <Row className="mx-0">
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/heavyEquipment.jpeg`}
              alt="Heavy Equipment"
              width={1500}
              height={1000}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="pt-2 px-3 mb-0">HEAVY EQUIPMENT</h1>
            <ListGroup className="pb-4" variant="flush">
              <ListGroup.Item className="pt-1">
                Develop models (digital twins) describing dynamic behavior of
                the machine comprising multiple interacting domains: electrical,
                hydraulic, mechanical, etc.
              </ListGroup.Item>
              <ListGroup.Item>
                Develop and test supervisory machine control algorithms
              </ListGroup.Item>
              <ListGroup.Item>
                Predict machine performance in terms of its ability to achieve
                target operating cycle requirements
              </ListGroup.Item>
              <ListGroup.Item>
                Test embedded controls software using machine models in a
                hardware-in-the-loop (HIL) test platform
              </ListGroup.Item>
              <ListGroup.Item>
                Leverage machine models and in-field data to synthesize
                artificial intelligence (AI) algorithms for predictive
                maintenance and machine performance optimization
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row className="mx-0">
          <Col
            className="d-flex flex-column justify-content-center"
            xs={{ span: 12, order: 2 }}
            lg={{ span: 4, order: 1 }}
          >
            <h1 className="pt-2 px-3 mb-0" style={{ textAlign: "end" }}>
              INDUSTRIAL AUTOMATION
            </h1>
            <ListGroup
              className="pb-4"
              variant="flush"
              style={{ textAlign: "end" }}
            >
              <ListGroup.Item className="pt-1">
                Develop models (digital twins) describing dynamic behavior of
                the machine comprising multiple interacting domains: electrical,
                hydraulic, mechanical, etc.
              </ListGroup.Item>
              <ListGroup.Item>
                Develop and test supervisory control logic algorithms
              </ListGroup.Item>
              <ListGroup.Item>
                Perform Monte Carlo scenario simulation studies for anomaly
                detection, fault isolation, and to increase operational
                efficiency
              </ListGroup.Item>
              <ListGroup.Item>
                Leverage machine models and in-field data to synthesize
                artificial intelligence (AI) algorithms for predictive
                maintenance and operations optimization
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12, order: 1 }}
            lg={{ span: 8, order: 2 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/industrialAutomation.jpeg`}
              alt="Industrial Automation"
              width={1500}
              height={1000}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Col>
        </Row>

        <Row className="mx-0">
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/entertainment.jpeg`}
              alt="Entertainment"
              width={1500}
              height={1000}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="pt-2 px-3 mb-0">ENTERTAINMENT</h1>
            <ListGroup className="pb-4" variant="flush">
              <ListGroup.Item className="pt-1">
                Develop dynamic models for both tracked and trackless ride
                systems
              </ListGroup.Item>
              <ListGroup.Item>
                Perform motion analysis, predict dynamic forces on the ride
                system components and guest accelerations
              </ListGroup.Item>
              <ListGroup.Item>
                Perform Monte Carlo scenario simulation studies for capacity
                planning and cycle-time optimization
              </ListGroup.Item>
              <ListGroup.Item>
                Develop and test supervisory control logic for ride systems
              </ListGroup.Item>
              <ListGroup.Item>
                Develop animatronics system models with kinematics, dynamics and
                collision detection capabilities
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row className="mx-0">
          <Col
            className="d-flex flex-column justify-content-center"
            xs={{ span: 12, order: 2 }}
            lg={{ span: 4, order: 1 }}
          >
            <h1 className="pt-2 px-3 mb-0" style={{ textAlign: "end" }}>
              ROBOTICS
            </h1>
            <ListGroup
              className="pb-4"
              variant="flush"
              style={{ textAlign: "end" }}
            >
              <ListGroup.Item className="pt-1">
                Develop dynamic robotic system models with kinematics, dynamics
                and collision detection capabilities
              </ListGroup.Item>
              <ListGroup.Item>
                Develop and test supervisory control logic algorithms
              </ListGroup.Item>
              <ListGroup.Item>
                Develop and test advanced motion control algorithms
              </ListGroup.Item>
              <ListGroup.Item>
                Test and validate robot’s design and its interactions with the
                environment
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12, order: 1 }}
            lg={{ span: 8, order: 2 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/robotics.jpeg`}
              alt="Robotics"
              width={1500}
              height={1000}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Col>
        </Row>

        <Row className="mx-0">
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/medicalDevices.jpeg`}
              alt="Medical Devices"
              width={1500}
              height={1000}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="pt-2 px-3 mb-0">MEDICAL DEVICES</h1>
            <ListGroup className="pb-4" variant="flush">
              <ListGroup.Item className="pt-1">
                Develop models (digital twins) describing dynamic behavior of
                the device comprising multiple interacting domains: electrical,
                hydraulic, mechanical, etc.
              </ListGroup.Item>
              <ListGroup.Item>
                Develop and test supervisory device control algorithms
              </ListGroup.Item>
              <ListGroup.Item>
                Test embedded controls software using device models in a
                hardware-in-the-loop (HIL) test platform
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Industries;
