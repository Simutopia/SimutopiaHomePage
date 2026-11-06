import {
  AccountTree,
  BarChart,
  Engineering,
  HourglassBottom,
  LaptopMac,
  Sync,
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
    title: "Digital Twin Modeling",
    icon: <Engineering fontSize="inherit" />,
    items: [
      "Develop models describing dynamic behavior of physical systems involving multiple domains utilizing both first principles and data-driven approaches",
      "Model fault dynamics to study the impact of failures at both component and subsystem levels on the behavior of the overall system",
      "Create reduced order models that can be deployed in real-time control applications",
      <>
        Expertise in creating plant models using{" "}
        {productLink("Simulink®", "https://www.mathworks.com/products/simulink.html?s_tid=hp_products_simulink")},{" "}
        {productLink("Simscape™", "https://www.mathworks.com/products/simscape.html")}, and{" "}
        {productLink("Simscape™ Multibody™", "https://www.mathworks.com/products/simmechanics.html")}
      </>,
    ],
  },
  {
    title: "Control Systems Modeling",
    icon: <Sync fontSize="inherit" />,
    items: [
      "Develop closed-loop system models comprising plant dynamics and controller subsystems to design and analyze the controller behavior",
      "Create supervisory control logic using state machines",
      "Develop and test advanced motor control strategies for motion control applications",
      <>
        Expertise in using{" "}
        {productLink("Simulink® Control Design™", "https://www.mathworks.com/products/simcontrol.html")},{" "}
        {productLink("System Identification Toolbox™", "https://www.mathworks.com/products/sysid.html")}, and{" "}
        {productLink("Stateflow®", "https://www.mathworks.com/products/stateflow.html")}
      </>,
      <>
        Generate embeddable controls software using{" "}
        {productLink("Simulink® Coder™", "https://www.mathworks.com/products/simulink-coder.html")} toolchain
      </>,
    ],
  },
  {
    title: "Training Simulators",
    icon: <AccountTree fontSize="inherit" />,
    items: [
      "Develop dynamic physical system models, including fault behaviors, and simulate them in pseudo-real time for deployment within simulator platforms",
      <>
        Integrate dynamic models within 3D visualization environments such as{" "}
        {productLink("Unity®", "https://unity.com/")} and{" "}
        {productLink("Unreal Engine®", "https://www.unrealengine.com/")}
      </>,
    ],
  },
  {
    title: "Real-Time Simulation & Testing",
    icon: <HourglassBottom fontSize="inherit" />,
    items: [
      "Develop and deploy control subsystem models using Processor-in-the-loop (PIL) framework for rapid control prototyping",
      "Develop and deploy virtual plant models using Hardware-in-the-Loop (HIL) framework for automated testing of embedded controls software",
      <>
        Expertise in working with{" "}
        {productLink("Simulink® Real-Time™", "https://www.mathworks.com/products/simulink-real-time.html")} and{" "}
        {productLink("Speedgoat", "https://www.speedgoat.com/")}
      </>,
      <>
        Expertise in working with{" "}
        {productLink("Beckhoff® MATLAB® Suite", "https://www.beckhoff.com/en-us/products/automation/twincat/te1xxx-twincat-3-engineering/te1410.html")}{" "}
        (TE1400, TE1401 & TE1410) for deploying{" "}
        {productLink("Simulink®", "https://www.mathworks.com/products/simulink.html?s_tid=hp_products_simulink")} models on{" "}
        {productLink("Beckhoff®", "https://www.beckhoff.com/en-us/")} PLCs
      </>,
    ],
  },
  {
    title: "Application Development",
    icon: <LaptopMac fontSize="inherit" />,
    items: [
      <>
        Develop graphical user interface (GUI) applications using{" "}
        {productLink("MATLAB® App Designer", "https://www.mathworks.com/products/matlab/app-designer.html")}
      </>,
      <>
        Develop apps that can run within{" "}
        {productLink("MATLAB®", "https://www.mathworks.com/products/matlab.html?s_tid=hp_products_matlab")} environment or as a compiled standalone executable
      </>,
    ],
  },
  {
    title: "Data Analysis",
    icon: <BarChart fontSize="inherit" />,
    items: [
      <>
        Leverage built-in{" "}
        {productLink("MATLAB®", "https://www.mathworks.com/products/matlab.html?s_tid=hp_products_matlab")} functions and create custom tools for statistical analysis, machine learning, and signal processing
      </>,
      "Simulate plant models in both nominal and fault modes to synthesize data for machine learning applications",
      "Use parallel computing techniques for solving computationally and data intensive problems",
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
    <Box sx={{ bgcolor: "#5e6063", pt: 5, pb: 15 }}>
      <Container maxWidth="xl">
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
      </Container>
    </Box>
  </Box>
);

export default Services;
