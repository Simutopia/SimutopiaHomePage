import { Box, List, ListItem, Typography } from "@mui/material";
import ContentPageShell from "../components/ContentPageShell";
import H2Formula from "../components/H2Formula";
import {
  bodyTextSx,
  contentItemTitleSx,
  contentStackGap,
  logoAccentCycle,
  sectionPy,
  stickyScrollMargin,
  subsectionHeadingSx,
} from "../theme/tokens";

/** Areas of Expertise ← simutopia.com Services section */
const expertiseAreas = [
  {
    title: "Digital Twin Modeling",
    items: [
      "Develop models describing dynamic behavior of physical systems involving multiple domains utilizing both first principles and data-driven approaches.",
      "Model fault dynamics to study the impact of failures at both component and subsystem levels on the behavior of the overall system.",
      "Create reduced order models that can be deployed in real-time control applications.",
    ],
  },
  {
    title: "Control Systems Modeling",
    items: [
      "Develop closed-loop system models comprising plant dynamics and controller subsystems to design and analyze the controller behavior.",
      "Create supervisory control logic using state machines.",
      "Develop advanced system-level motion control algorithms for robotics and machine automation applications.",
      "Generate embeddable controls software from validated system models.",
    ],
  },
  {
    title: "Training Simulators",
    items: [
      "Develop system-level dynamic models that mimic a physical system, including fault behaviors, and run in pseudo-real time for deployment within simulator platforms.",
      "Integrate these dynamic models within 3D visualization environments like Unity® and Unreal®.",
    ],
  },
  {
    title: "Real-Time Simulation & Testing",
    items: [
      "Develop and deploy virtual plant subsystems in a Model-in-the-Loop (MIL) setup for unit and subsystem integration testing.",
      "Develop and deploy control subsystem models in a Processor-in-the-Loop (PIL) setup and run them in conjunction with the plant model for rapid prototyping of control algorithms.",
      "Develop and deploy virtual plant models in a Hardware-in-the-Loop (HIL) setup and create automated tests for testing embedded control systems software.",
      "Work with Speedgoat and Beckhoff hardware-based HIL platforms.",
    ],
  },
  {
    title: "Mechanical Design, Structural Analysis & Drawings",
    items: [
      "Provide design support and develop 3D CAD models.",
      "Perform design analysis for structural integrity using finite element analysis (FEA) techniques.",
      "Create 2D production drawings from the 3D CAD assemblies.",
    ],
  },
  {
    title: "Data Analysis",
    items: [
      "Apply statistical analysis, machine learning, and signal processing to large engineering datasets.",
      "Simulate plant models in both nominal and fault modes to synthesize data for AI/ML applications.",
      "Use parallel computing techniques for solving computationally and data-intensive problems.",
    ],
  },
  {
    title: "Urban Mobility Simulations",
    items: [
      "Simulate people motion in 3D environments for spatial design analysis to assess safety, efficiency, and accessibility.",
      "Run both microscopic and macroscopic traffic simulations including vehicular and pedestrian flow for urban mobility solutions.",
    ],
  },
  {
    title: "Apps Development",
    items: [
      "Develop user-friendly apps using the latest web and cloud technologies.",
      "Leverage powerful simulation models as backend physics engines with a modern user interface.",
    ],
  },
];

/** Industries ← simutopia.com Industries section */
const industries = [
  {
    title: "Heavy Equipment",
    items: [
      "Develop system-level dynamic simulation models of several machines including excavator, wheel loader, motor grader, forklift, and tractor.",
      "Use machine models to design and analyze 3D mechanical linkages, size powertrain and hydraulic components, and design and test control logic for advanced operator assistance algorithms including vehicle stability analysis.",
      "Implement ground-contact dynamics and co-simulate with DEM software for calculating realistic soil loads.",
      "Leverage machine models to synthesize data for training surrogate models to perform advanced operator assistance operations.",
    ],
  },
  {
    title: "Industrial Automation",
    items: [
      "Develop models (digital twins) describing dynamic behavior of the machine comprising multiple interacting domains: electrical, hydraulic, mechanical, etc.",
      "Develop and test supervisory control logic algorithms.",
      "Perform Monte Carlo scenario simulation studies for anomaly detection, fault isolation, and to increase operational efficiency.",
      "Leverage machine models and in-field data to synthesize artificial intelligence (AI) algorithms for predictive maintenance and operations optimization.",
    ],
  },
  {
    title: "Themed Entertainment",
    items: [
      "Leverage experience from Walt Disney Imagineering — where we applied model-based design methodologies to state-of-the-art ride systems and audio-animatronics figures — to support themed entertainment projects.",
      "Develop dynamic models of both tracked and trackless ride systems to perform motion analysis, predict dynamic forces and guest accelerations, and design supervisory control systems.",
      "Perform Monte Carlo simulation studies for capacity planning and cycle-time optimization.",
      "Implement people movement simulations using Oasys MassMotion®, agent-based modeling software with full 3D BIM import capabilities, to assess safety, efficiency, and accessibility of the physical environments for guest flow.",
      "Develop dynamic models of animatronics systems with kinematics, dynamics, and collision detection capabilities.",
      "Perform design analysis for structural integrity using finite element analysis (FEA) techniques.",
      "Provide 3D design support and create 2D production drawings for several animatronics and show systems.",
    ],
  },
  {
    title: "Robotics",
    items: [
      "Develop dynamic robotic system models with kinematics, dynamics, and collision detection capabilities.",
      "Develop and test advanced motion control and stability algorithms.",
      "Test and validate robot’s design and its interactions with the environment.",
      "Develop a digital pipeline to enable smooth flow of data between various tools — design, simulation, and control/operation toolchains.",
    ],
  },
  {
    title: "Hydrogen Industry",
    items: [
      <>
        Support projects across the <H2Formula /> value chain — production, distribution, and
        usage.
      </>,
      <>
        Develop dynamic models of <H2Formula /> electrolyzer systems and fuel cell power systems
        including balance-of-plant (BoP) subsystems to perform design studies in terms of component
        sizing, energy management, and operations optimization.
      </>,
      <>
        Develop closed-loop <H2Formula /> refueling station system models for performing component
        sizing and controls design given the fuel dispensing and station operation requirements.
      </>,
    ],
  },
];

const ContentGroup = ({ title, items, accentColor, reversed = false }) => (
  <Box
    component="article"
    sx={{
      width: "100%",
      maxWidth: { xs: "100%", md: 760 },
      ml: reversed ? { xs: 0, md: "auto" } : 0,
      // Block shifts left/right; bullets stay before the text (normal LTR).
      pl: 2,
      pr: { xs: 0, md: reversed ? 0 : 0 },
      borderLeft: `3px solid ${accentColor}`,
      textAlign: "left",
    }}
  >
    <Typography component="h3" sx={contentItemTitleSx}>
      {title}
    </Typography>
    <List disablePadding>
      {items.map((item, index) => (
        <ListItem
          key={typeof item === "string" ? item : index}
          disableGutters
          sx={{
            display: "list-item",
            listStyleType: "disc",
            ml: 2.25,
            py: 0.4,
            pl: 0.5,
          }}
        >
          <Typography sx={bodyTextSx}>{item}</Typography>
        </ListItem>
      ))}
    </List>
  </Box>
);

const ServicesPage = () => (
  <ContentPageShell
    title="Services"
    intro="We bring together deep technical expertise, fluency in advanced simulation tools, and multi-industry perspective to solve a wide variety of engineering challenges. Explore our areas of expertise and industries we serve below."
    introMaxWidth={880}
  >
    <Box
      id="areas-of-expertise"
      component="section"
      sx={{ mb: sectionPy, scrollMarginTop: stickyScrollMargin }}
    >
      <Typography component="h2" sx={subsectionHeadingSx}>
        Areas of Expertise
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: contentStackGap,
        }}
      >
        {expertiseAreas.map((group, index) => (
          <ContentGroup
            key={group.title}
            title={group.title}
            items={group.items}
            accentColor={logoAccentCycle[index % logoAccentCycle.length]}
          />
        ))}
      </Box>
    </Box>

    <Box
      id="industries"
      component="section"
      sx={{ scrollMarginTop: stickyScrollMargin }}
    >
      <Typography component="h2" sx={subsectionHeadingSx}>
        Industries
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: contentStackGap,
          width: "100%",
        }}
      >
        {industries.map((group, index) => (
          <ContentGroup
            key={group.title}
            title={group.title}
            items={group.items}
            accentColor={logoAccentCycle[index % logoAccentCycle.length]}
            reversed={index % 2 === 1}
          />
        ))}
      </Box>
    </Box>
  </ContentPageShell>
);

export default ServicesPage;
