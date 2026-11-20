import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ContentPageShell from "../components/ContentPageShell";
import H2Formula from "../components/H2Formula";
import caseStudies from "../data/caseStudies";
import {
  contentItemTitleSx,
  contentStackGap,
  colors,
  logoAccentCycle,
  mutedTextSx,
} from "../theme/tokens";

/** Listing titles for studies not yet fully authored */
const upcomingTitles = [
  "Realistic Soil Loads Modeling using DEM",
  "Wheel Loader",
  "Autonomous mining machine",
  "Forklift Stability Analysis",
  <><H2Formula /> Fuel Cell Power System</>,
  <><H2Formula /> Refueling</>,
  "Animatronic System Dynamics",
  "Traffic Flow Simulation",
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
          key={study.slug}
          component="li"
          sx={{
            pl: 2,
            borderLeft: `3px solid ${logoAccentCycle[index % logoAccentCycle.length]}`,
          }}
        >
          <Typography
            component={RouterLink}
            to={`/case-studies/${study.slug}`}
            sx={{
              ...contentItemTitleSx,
              mb: 0.35,
              display: "inline-block",
              textDecoration: "none",
              color: colors.ink,
              borderBottom: `1px solid transparent`,
              "&:hover": {
                borderBottomColor: colors.accentSoft,
                color: colors.logoWordmark,
              },
            }}
          >
            {study.title}
          </Typography>
          <Typography sx={mutedTextSx}>{study.summary}</Typography>
        </Box>
      ))}

      {upcomingTitles.map((title, index) => (
        <Box
          key={typeof title === "string" ? title : index}
          component="li"
          sx={{
            pl: 2,
            borderLeft: `3px solid ${
              logoAccentCycle[(caseStudies.length + index) % logoAccentCycle.length]
            }`,
          }}
        >
          <Typography
            component="h2"
            sx={{
              ...contentItemTitleSx,
              mb: 0.35,
            }}
          >
            {title}
          </Typography>
          <Typography sx={mutedTextSx}>Details coming soon.</Typography>
        </Box>
      ))}
    </Box>
  </ContentPageShell>
);

export default CaseStudiesPage;
