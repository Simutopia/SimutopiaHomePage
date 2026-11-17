import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import ContentPageShell from "../components/ContentPageShell";
import { getCaseStudyBySlug } from "../data/caseStudies";
import {
  bodyTextSx,
  buttonLabelSx,
  colors,
  contentItemTitleSx,
  contentStackGap,
  logoAccentCycle,
  mutedTextSx,
  subsectionHeadingSx,
} from "../theme/tokens";

const Section = ({ title, items, accentColor }) => (
  <Box
    component="section"
    sx={{
      pl: 2,
      borderLeft: `3px solid ${accentColor}`,
    }}
  >
    <Typography component="h2" sx={{ ...contentItemTitleSx, mb: 1 }}>
      {title}
    </Typography>
    <List disablePadding>
      {items.map((item) => (
        <ListItem
          key={item}
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

const backLinkSx = {
  ...bodyTextSx,
  color: colors.ink,
  fontWeight: 600,
  textDecoration: "none",
  borderBottom: `1px solid ${colors.accentSoft}`,
  width: "fit-content",
  display: "inline-block",
  "&:hover": { color: colors.logoWordmark },
};

const AllCaseStudiesLink = () => (
  <Typography component={RouterLink} to="/case-studies" sx={backLinkSx}>
    ← All case studies
  </Typography>
);

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <ContentPageShell
      title={study.title}
      intro={study.summary}
      introMaxWidth={880}
      beforeTitle={<AllCaseStudiesLink />}
    >
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Box
          component="video"
          src={study.video}
          poster={study.poster}
          controls
          playsInline
          preload="metadata"
          sx={{
            display: "block",
            width: "100%",
            maxHeight: { xs: 320, md: 480 },
            objectFit: "contain",
            borderRadius: 1.5,
            bgcolor: colors.dark,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: contentStackGap,
          mb: { xs: 3, md: 4 },
        }}
      >
        <Section
          title="Goals"
          items={study.goals}
          accentColor={logoAccentCycle[0]}
        />
        <Section
          title="Approach"
          items={study.approach}
          accentColor={logoAccentCycle[1]}
        />
        <Section
          title="Outcomes"
          items={study.outcomes || study.results}
          accentColor={logoAccentCycle[2]}
        />
      </Box>

      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography component="h2" sx={{ ...subsectionHeadingSx, mb: 1.5 }}>
          Related Services
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {study.keywords.map((keyword) => (
            <Typography
              key={keyword}
              component={RouterLink}
              to="/services"
              sx={{
                ...bodyTextSx,
                fontSize: "0.88rem",
                px: 1.25,
                py: 0.45,
                borderRadius: 1,
                border: `1px solid ${colors.borderStrong}`,
                color: colors.body,
                textDecoration: "none",
                "&:hover": {
                  borderColor: colors.accentSoft,
                  color: colors.ink,
                },
              }}
            >
              {keyword}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: 1.25, md: 1.5 },
          mb: 2.5,
        }}
      >
        <Button
          component={RouterLink}
          to="/contact"
          variant="contained"
          disableElevation
          sx={{
            ...buttonLabelSx,
            px: 2.25,
            py: 0.85,
            fontWeight: 700,
            borderRadius: 1.5,
            bgcolor: colors.accentSoft,
            color: colors.ink,
            flexShrink: 0,
            "&:hover": {
              bgcolor: colors.accent,
              color: colors.white,
            },
          }}
        >
          Talk to us
        </Button>
        <Typography sx={{ ...mutedTextSx, flex: "1 1 240px", m: 0 }}>
          {study.cta}
        </Typography>
      </Box>

      <AllCaseStudiesLink />
    </ContentPageShell>
  );
};

export default CaseStudyDetailPage;
