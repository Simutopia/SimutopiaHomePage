import { Container, Row, Col, ListGroup } from "react-bootstrap";

const Industries = () => {
  const industries = [
    {
      title: "HEAVY EQUIPMENT",
      image: "/images/heavyequipment.jpeg",
      description: [
        "Develop models (digital twins) describing dynamic behavior of the machine comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
        "Develop and test supervisory machine control algorithms.",
        "Predict machine performance in terms of its ability to achieve target operating cycle requirements.",
        "Test embedded controls software using machine models in a hardware-in-the-loop (HIL) test platform.",
        "Leverage machine models and in-field data to synthesize artificial intelligence (AI) algorithms for predictive maintenance and machine performance optimization.",
      ],
      reversed: false,
    },
    {
      title: "INDUSTRIAL AUTOMATION",
      image: "/images/industrialautomation.jpeg",
      description: [
        "Develop models (digital twins) describing dynamic behavior of the machine comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
        "Develop and test supervisory control logic algorithms.",
        "Perform Monte Carlo scenario simulation studies for anomaly detection, fault isolation, and to increase operational efficiency.",
        "Leverage machine models and in-field data to synthesize artificial intelligence (AI) algorithms for predictive maintenance and operations optimization.",
      ],
      reversed: true,
    },
    {
      title: "ENTERTAINMENT",
      image: "/images/entertainment.jpeg",
      description: [
        "Develop dynamic models for both tracked and trackless ride systems.",
        "Perform motion analysis, predict dynamic forces on the ride system components and guest accelerations.",
        "Perform Monte Carlo scenario simulation studies for capacity planning and cycle-time optimization.",
        "Develop and test supervisory control logic for ride systems.",
        "Develop animatronics system models with kinematics, dynamics and collision detection capabilities.",
      ],
      reversed: false,
    },
    {
      title: "ROBOTICS",
      image: "/images/robotics.jpeg",
      description: [
        "Develop dynamic robotic system models with kinematics, dynamics and collision detection capabilities.",
        "Develop and test supervisory control logic algorithms.",
        "Develop and test advanced motion control algorithms.",
        "Test and validate robot’s design and its interactions with the environment.",
      ],
      reversed: true,
    },
    {
      title: "MEDICAL DEVICES",
      image: "/images/medicaldevices.jpeg",
      description: [
        "Develop models (digital twins) describing dynamic behavior of the device comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
        "Develop and test supervisory device control algorithms.",
        "Test embedded controls software using device models in a hardware-in-the-loop (HIL) test platform.",
      ],
      reversed: false,
    },
  ];

  return (
    <Container fluid className="px-0 py-0 my-0" id="industriesTarget">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center sectionTitle"
      >
        <h1 className="display-1 my-1">INDUSTRIES</h1>
      </Container>

      {industries.map((industry, index) => (
        <Row key={index} className="mx-0">
          <Col
            className="p-0 applicationPicture"
            xs={{ span: 12 }}
            lg={{ span: 8, order: industry.reversed ? 2 : 1 }}
          >
            <img
              src={industry.image}  // Direct reference to the public folder
              alt={industry.title}
              width={1500}
              height={1000}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </Col>
          <Col
            className={`d-flex flex-column justify-content-center ${
              industry.reversed ? "text-end" : ""
            }`}
            xs={{ span: 12 }}
            lg={{ span: 4, order: industry.reversed ? 1 : 2 }}
          >
            <h1 className="pt-2 px-3 mb-0">{industry.title}</h1>
            <ListGroup className="pb-4" variant="flush">
              {industry.description.map((item, idx) => (
                <ListGroup.Item key={idx} className="pt-1">
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Industries;
