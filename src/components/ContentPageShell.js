import { Box, Container, Typography } from "@mui/material";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import {
  colors,
  pageTitleSx,
  sectionIntroMb,
  sectionIntroSx,
  sectionPy,
} from "../theme/tokens";

const atmosphere = "mist";

/**
 * Shared shell for public content pages (Products, Services, Case Studies, …).
 */
const ContentPageShell = ({ title, intro, introMaxWidth, children }) => (
  <Box
    component="section"
    sx={{
      ...getLightAtmosphereSx(atmosphere),
      py: sectionPy,
      minHeight: { xs: "45vh", md: "50vh" },
    }}
  >
    <AtmosphereGrid variant={atmosphere} />
    <Container maxWidth="lg" sx={{ position: "relative" }}>
      <Typography variant="h2" component="h1" sx={pageTitleSx}>
        {title}
      </Typography>
      {intro ? (
        <Typography
          sx={{
            ...sectionIntroSx,
            ...(introMaxWidth ? { maxWidth: introMaxWidth } : null),
            mb: children ? sectionIntroMb : 0,
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
