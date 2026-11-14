import { Typography } from "@mui/material";
import ContentPageShell from "../components/ContentPageShell";
import { colors, fonts } from "../theme/tokens";

const CaseStudiesPage = () => (
  <ContentPageShell
    title="Case Studies"
    intro="Brief highlights from projects we’ve delivered across modeling, simulation, and analysis."
  >
    <Typography
      sx={{
        fontFamily: fonts.sans,
        textAlign: "center",
        color: colors.muted,
        fontSize: { xs: "0.98rem", md: "1.05rem" },
        lineHeight: 1.6,
        maxWidth: 560,
        mx: "auto",
      }}
    >
      Case studies are coming soon.
    </Typography>
  </ContentPageShell>
);

export default CaseStudiesPage;
