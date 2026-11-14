import {
  AccountTree,
  Architecture,
  DirectionsWalk,
  Engineering,
  HourglassBottom,
  LaptopMac,
  Sync,
  Tune,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const productLink = (label, href) => (
  <Link href={href} target="_blank" rel="noreferrer" underline="hover">
    {label}
  </Link>
);

const services = [
  {
    title: "Physical-Systems (Plant / Digital-Twin) Modeling",
    icon: <Engineering fontSize="inherit" />,
    items: [
      "Develop models describing the dynamic behavior of physical systems involving multiple domains—electrical, hydraulic, mechanical, and more—using both first-principles and data-driven approaches.",
      <>
        Expertise creating plant models with{" "}
        {productLink("Simulink®", "https://www.mathworks.com/products/simulink.html?s_tid=hp_products_simulink")},{" "}
        {productLink("Simscape™", "https://www.mathworks.com/products/simscape.html")}, and{" "}
        {productLink("Simscape™ Multibody™", "https://www.mathworks.com/products/simmechanics.html")}.
      </>,
    ],
  },
  {
    title: "System-Level Control Systems Modeling",
    icon: <Sync fontSize="inherit" />,
    items: [
      "Develop closed-loop dynamic control system models to design and analyze controller behavior.",
      <>
        Expertise using{" "}
        {productLink("Simulink® Control Design™", "https://www.mathworks.com/products/simcontrol.html")},{" "}
        {productLink("System Identification Toolbox™", "https://www.mathworks.com/products/sysid.html")}, and{" "}
        {productLink("Stateflow®", "https://www.mathworks.com/products/stateflow.html")}.
      </>,
    ],
  },
  {
    title: "Motion Control",
    icon: <Tune fontSize="inherit" />,
    items: [
      "Develop advanced system-level motion control algorithms for robotics and machine automation applications.",
    ],
  },
  {
    title: "Design & Drawings",
    icon: <Architecture fontSize="inherit" />,
    items: [
      <>
        Provide design support and develop 3D CAD models. Expertise with{" "}
        {productLink("SolidWorks®", "https://www.solidworks.com/")} and{" "}
        {productLink("Onshape®", "https://www.onshape.com/")}.
      </>,
      <>
        Perform structural integrity analysis with finite-element analysis (FEA). Expertise with{" "}
        {productLink("Ansys Mechanical", "https://www.ansys.com/products/structures")}.
      </>,
      "Create 2D production drawings from 3D CAD assemblies.",
    ],
  },
  {
    title: "Training Simulator Platform",
    icon: <AccountTree fontSize="inherit" />,
    items: [
      "Develop system-level dynamic models that mimic a physical system, including fault behaviors, and run in pseudo-real time for deployment within simulator platforms.",
      <>
        Integrate dynamic models within 3D visualization environments such as{" "}
        {productLink("Unity®", "https://unity.com/")} and{" "}
        {productLink("Unreal Engine®", "https://www.unrealengine.com/")}.
      </>,
    ],
  },
  {
    title: "Real-Time Simulation & Testing",
    icon: <HourglassBottom fontSize="inherit" />,
    items: [
      "Develop and deploy virtual plant subsystems in a Model-in-the-Loop (MIL) setup for unit and subsystem integration testing.",
      "Develop and deploy control subsystem models in a Processor-in-the-Loop (PIL) setup with the plant model for rapid prototyping of control algorithms.",
      "Develop and deploy virtual plant models in a Hardware-in-the-Loop (HIL) setup and create automated tests for embedded control systems software.",
      <>
        Expertise with{" "}
        {productLink("Speedgoat", "https://www.speedgoat.com/")} hardware-based HIL platforms and{" "}
        {productLink("Simulink® Real-Time™", "https://www.mathworks.com/products/simulink-real-time.html")}.
      </>,
      <>
        Expertise deploying MATLAB and Simulink based functions and models on{" "}
        {productLink("Beckhoff®", "https://www.beckhoff.com/en-us/")} PLCs using TwinCAT (
        {productLink("TE1400 / TE1401 / TE1410", "https://www.beckhoff.com/en-us/products/automation/twincat/te1xxx-twincat-3-engineering/te1410.html")}
        ).
      </>,
    ],
  },
  {
    title: "Application Development",
    icon: <LaptopMac fontSize="inherit" />,
    items: [
      <>
        Develop GUI applications that leverage MATLAB & Simulink based code and models in the backend, including compiled standalone modules integrated with graphical environments.
      </>,
      <>
        Expertise with{" "}
        {productLink("MATLAB®", "https://www.mathworks.com/products/matlab.html?s_tid=hp_products_matlab")} and{" "}
        {productLink("Simulink® Compiler", "https://www.mathworks.com/products/simulink-compiler.html")} tooling.
      </>,
    ],
  },
  {
    title: "Human Flow (Pedestrian) Simulations",
    icon: <DirectionsWalk fontSize="inherit" />,
    items: [
      <>
        Simulate people motion in 3D environments for spatial design analysis—safety, efficiency, and accessibility. Expertise with{" "}
        {productLink("Oasys MassMotion", "https://www.oasys-software.com/products/massmotion/")}.
      </>,
    ],
  },
];

const Services = () => (
  <Box component="section" id="servicesTarget">
    <Box sx={{ bgcolor: "#212529", color: "common.white", textAlign: "center", py: 1 }}>
      <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "3rem", md: "5rem" }, my: 0 }}>
        SERVICES
      </Typography>
    </Box>
    <Box sx={{ bgcolor: "#5e6063", pt: 5, pb: 8 }}>
      <Container maxWidth="xl">
        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: 720,
            mx: "auto",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.15rem" },
          }}
        >
          Modeling, simulation, and analysis services that accelerate design and innovation
          through model-based design.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {services.map(({ title, icon, items }) => (
            <Card key={title} sx={{ height: "100%", bgcolor: "#9adeeb" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ fontSize: 56, textAlign: "center" }}>{icon}</Box>
                <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.3)" }} />
                <Typography variant="h5" component="h3" textAlign="center" sx={{ mb: 2 }}>
                  {title}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <List disablePadding>
                  {items.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ alignItems: "flex-start", py: 1 }}>
                      <Typography variant="body2">{item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Typography
          variant="caption"
          component="p"
          sx={{
            display: "block",
            mt: 4,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 900,
            mx: "auto",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          MATLAB, Simulink, Stateflow, Simulink Control Design, System Identification, Simscape,
          Simscape Multibody, and Simulink Real-Time are MathWorks® software products. TE1400,
          TE1401, TE1410, and TwinCAT® are Beckhoff® software products. Other product names are
          trademarks of their respective owners.
        </Typography>
      </Container>
    </Box>
  </Box>
);

export default Services;
