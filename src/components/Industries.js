import { Box, Container, List, ListItem, Typography } from "@mui/material";

const industries = [
  {
    title: "HEAVY EQUIPMENT",
    image: "/images/heavyEquipment.png",
    description: [
      "Develop system-level dynamic simulation models of machines such as excavators, wheel loaders, motor graders, forklifts, and tractors.",
      "Use machine models to design and analyze 3D mechanical linkages, size powertrain and hydraulic components, and design and test control logic for advanced operator assistance—including vehicle stability analysis.",
      "Implement ground-contact dynamics and co-simulate with DEM software for realistic soil loads.",
    ],
  },
  {
    title: "THEMED ENTERTAINMENT",
    image: "/images/entertainment.png",
    reversed: true,
    description: [
      "Apply model-based design experience from Walt Disney Imagineering on ride systems and audio-animatronics to themed entertainment projects.",
      "Develop dynamic models of tracked and trackless ride systems for motion analysis, dynamic forces, guest accelerations, and supervisory control design.",
      "Perform Monte Carlo studies for capacity planning and cycle-time optimization.",
      "Simulate people movement with Oasys MassMotion® for safety, efficiency, and accessibility of guest flow in 3D environments.",
      "Develop animatronics models with kinematics, dynamics, and collision detection; implement motion control for smooth following and vibration suppression; support FEA structural analysis and 3D/2D design deliverables.",
    ],
  },
  {
    title: "INDUSTRIAL AUTOMATION",
    image: "/images/industrialAutomation.png",
    description: [
      "Develop dynamic models of industrial machinery across interacting domains: electrical, hydraulic, mechanical, and more.",
      "Perform machine design optimization studies to automate operations.",
      "Leverage machine models and in-field data to synthesize AI algorithms for predictive maintenance, anomaly detection, and operations optimization.",
    ],
  },
  {
    title: "HYDROGEN",
    image: "/images/simutopia-engineering-background.png",
    reversed: true,
    description: [
      "Support clients across hydrogen production, distribution, and use of H₂ fuel.",
      "Develop dynamic models of H₂ electrolyzer systems and fuel cell power systems, including balance-of-plant subsystems, for component sizing, energy management, and operations optimization.",
      "Develop closed-loop H₂ refueling station system models for component sizing and controls design against fuel dispensing and station operation requirements.",
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
            minHeight: { lg: 280 },
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
