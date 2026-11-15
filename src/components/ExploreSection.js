import { Box, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { buttonLabelSx, colors, sectionPy } from "../theme/tokens";

const atmosphere = "dual";

const secondaryButtonSx = {
  ...buttonLabelSx,
  fontWeight: 600,
  borderRadius: 1.5,
  px: 2.5,
  py: 1,
  color: colors.ink,
  borderColor: colors.borderCard,
  bgcolor: "rgba(255,255,255,0.7)",
  "&:hover": {
    borderColor: colors.accentSoft,
    bgcolor: "rgba(143, 201, 140, 0.1)",
  },
};

const primaryButtonSx = {
  ...buttonLabelSx,
  fontWeight: 700,
  borderRadius: 1.5,
  px: 2.5,
  py: 1,
  bgcolor: colors.accentSoft,
  color: colors.ink,
  "&:hover": {
    bgcolor: colors.accent,
    color: colors.white,
  },
};

const ExploreSection = () => (
  <Box
    component="section"
    aria-label="Next steps"
    sx={{
      ...getLightAtmosphereSx(atmosphere),
      py: sectionPy,
      borderTop: `1px solid ${colors.border}`,
    }}
  >
    <AtmosphereGrid variant={atmosphere} />
    <Container maxWidth="md" sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        <Button
          component={RouterLink}
          to="/services"
          variant="outlined"
          sx={secondaryButtonSx}
        >
          Explore what we do
        </Button>
        <Button
          component={RouterLink}
          to="/about"
          variant="outlined"
          sx={secondaryButtonSx}
        >
          See who we are
        </Button>
        <Button
          component={RouterLink}
          to="/contact"
          variant="contained"
          disableElevation
          sx={primaryButtonSx}
        >
          Talk to us
        </Button>
      </Box>
    </Container>
  </Box>
);

export default ExploreSection;
