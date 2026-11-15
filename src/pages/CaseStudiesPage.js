import { Box, Typography } from "@mui/material";
import ContentPageShell from "../components/ContentPageShell";
import { colors, fonts } from "../theme/tokens";

/** Readable H₂ — match Services page */
const H2Formula = () => (
  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
    H
    <Box
      component="span"
      sx={{
        fontSize: "0.78em",
        fontWeight: 600,
        verticalAlign: "-0.15em",
        ml: "0.02em",
      }}
    >
      2
    </Box>
  </Box>
);

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

const logoAccentCycle = [
  colors.logoBlue,
  colors.logoRed,
  colors.logoYellow,
  colors.logoGreen,
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
        gap: { xs: 2, md: 2.25 },
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
              fontFamily: fonts.sans,
              fontSize: { xs: "1.05rem", md: "1.12rem" },
              fontWeight: 650,
              color: colors.ink,
              lineHeight: 1.4,
            }}
          >
            {study.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: fonts.sans,
              fontSize: "0.9rem",
              color: colors.muted,
              mt: 0.35,
            }}
          >
            Details coming soon.
          </Typography>
        </Box>
      ))}
    </Box>
  </ContentPageShell>
);

export default CaseStudiesPage;
