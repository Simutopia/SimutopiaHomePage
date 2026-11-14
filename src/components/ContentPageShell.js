import { Box, Container, Typography } from "@mui/material";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { colors, fonts, sectionIntroSx } from "../theme/tokens";

const atmosphere = "mist";

/**
 * Lightweight public-page shell for stub / upcoming content pages.
 */
const ContentPageShell = ({ title, intro, introMaxWidth, children }) => (
  <Box
    component="section"
    sx={{
      ...getLightAtmosphereSx(atmosphere),
      py: { xs: 6, md: 8 },
      minHeight: { xs: "50vh", md: "55vh" },
    }}
  >
    <AtmosphereGrid variant={atmosphere} />
    <Container maxWidth="lg" sx={{ position: "relative" }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          mb: { xs: 2, md: 2.5 },
          fontFamily: fonts.sans,
          fontSize: { xs: "1.15rem", md: "1.35rem" },
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
          color: colors.ink,
        }}
      >
        {title}
      </Typography>
      {intro ? (
        <Typography
          sx={{
            ...sectionIntroSx,
            ...(introMaxWidth ? { maxWidth: introMaxWidth } : null),
            mb: children ? { xs: 4, md: 5 } : 0,
            color: colors.body,
          }}
        >
          {intro}
        </Typography>
      ) : null}
      {children}
    </Container>
  </Box>
);

export default ContentPageShell;
