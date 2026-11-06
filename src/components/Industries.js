import { Box, Container, List, ListItem, Typography } from "@mui/material";

const industries = [
  {
    title: "HEAVY EQUIPMENT",
    image: "/images/heavyEquipment.png",
    description: [
      "Develop models (digital twins) describing dynamic behavior of the machine comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
      "Develop and test supervisory machine control algorithms.",
      "Predict machine performance in terms of its ability to achieve target operating cycle requirements.",
      "Test embedded controls software using machine models in a hardware-in-the-loop (HIL) test platform.",
      "Leverage machine models and in-field data to synthesize artificial intelligence (AI) algorithms for predictive maintenance and machine performance optimization.",
    ],
  },
  {
    title: "INDUSTRIAL AUTOMATION",
    image: "/images/industrialAutomation.png",
    reversed: true,
    description: [
      "Develop models (digital twins) describing dynamic behavior of the machine comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
      "Develop and test supervisory control logic algorithms.",
      "Perform Monte Carlo scenario simulation studies for anomaly detection, fault isolation, and to increase operational efficiency.",
      "Leverage machine models and in-field data to synthesize artificial intelligence (AI) algorithms for predictive maintenance and operations optimization.",
    ],
  },
  {
    title: "ENTERTAINMENT",
    image: "/images/entertainment.png",
    description: [
      "Develop dynamic models for both tracked and trackless ride systems.",
      "Perform motion analysis, predict dynamic forces on the ride system components and guest accelerations.",
      "Perform Monte Carlo scenario simulation studies for capacity planning and cycle-time optimization.",
      "Develop and test supervisory control logic for ride systems.",
      "Develop animatronics system models with kinematics, dynamics and collision detection capabilities.",
    ],
  },
  {
    title: "ROBOTICS",
    image: "/images/robotics.png",
    reversed: true,
    description: [
      "Develop dynamic robotic system models with kinematics, dynamics and collision detection capabilities.",
      "Develop and test supervisory control logic algorithms.",
      "Develop and test advanced motion control algorithms.",
      "Test and validate robot’s design and its interactions with the environment.",
    ],
  },
  {
    title: "MEDICAL DEVICES",
    image: "/images/medicalDevices.png",
    description: [
      "Develop models (digital twins) describing dynamic behavior of the device comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
      "Develop and test supervisory device control algorithms.",
      "Test embedded controls software using device models in a hardware-in-the-loop (HIL) test platform.",
    ],
  },
];

const Industries = () => (
  <Box component="section" id="industriesTarget">
    <Box sx={{ bgcolor: "#212529", color: "common.white", textAlign: "center", py: 1 }}>
      <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "3rem", md: "5rem" }, my: 0 }}>
        INDUSTRIES
      </Typography>
    </Box>
    {industries.map(({ title, image, reversed, description }) => (
      <Box
        key={title}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: reversed ? "1fr 2fr" : "2fr 1fr",
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            gridColumn: { lg: reversed ? 2 : 1 },
            gridRow: { lg: 1 },
          }}
        />
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: 3,
            textAlign: reversed ? { xs: "left", lg: "right" } : "left",
            gridColumn: { lg: reversed ? 1 : 2 },
            gridRow: { lg: 1 },
          }}
        >
          <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <List disablePadding>
            {description.map((item) => (
              <ListItem key={item} disableGutters sx={{ alignItems: "flex-start", py: 0.75 }}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    ))}
  </Box>
);

export default Industries;
