import { Box, Typography } from "@mui/material";
import ContentPageShell from "../components/ContentPageShell";
import H2Formula from "../components/H2Formula";
import {
  contentItemTitleSx,
  contentStackGap,
  logoAccentCycle,
  mutedTextSx,
} from "../theme/tokens";

const caseStudies = [
  { title: "Excavator" },
  { title: "Realistic Soil Loads Modeling using DEM" },
  { title: "Wheel Loader" },
  { title: "Autonomous mining machine" },
  { title: "Forklift Stability Analysis" },
  { title: <><H2Formula /> Fuel Cell Power System</> },
  { title: <><H2Formula /> Refueling</> },
  { title: "Animatronic System Dynamics" },
  { title: "Human Flow Simulation" },
  { title: "Traffic Flow Simulation" },
];

const CaseStudiesPage = () => (
  <ContentPageShell
    title="Case Studies"
    intro="Brief highlights from projects we’ve delivered across modeling, simulation, and analysis."
  >
    <Box
      component="ol"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "flex",
        flexDirection: "column",
        gap: contentStackGap,
        maxWidth: 720,
        mx: "auto",
      }}
    >
      {caseStudies.map((study, index) => (
        <Box
          key={index}
          component="li"
          sx={{
            pl: 2,
            borderLeft: `3px solid ${logoAccentCycle[index % logoAccentCycle.length]}`,
          }}
        >
          <Typography
            component="h2"
            sx={{
              ...contentItemTitleSx,
              mb: 0.35,
            }}
          >
            {study.title}
          </Typography>
          <Typography sx={mutedTextSx}>Details coming soon.</Typography>
        </Box>
      ))}
    </Box>
  </ContentPageShell>
);

export default CaseStudiesPage;
