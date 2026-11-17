import { Box, Container, Typography } from "@mui/material";
import { colors, fonts, mutedTextSx } from "../theme/tokens";

const Footer = () => (
  <Box
    component="footer"
    id="footer"
    sx={{
      bgcolor: colors.white,
      color: colors.muted,
      fontFamily: fonts.sans,
      py: { xs: 1.5, md: 1.75 },
      borderTop: `1px solid ${colors.border}`,
      "& .MuiTypography-root": {
        fontFamily: fonts.sans,
      },
    }}
  >
    <Container maxWidth="xl">
      <Typography
        variant="body2"
        sx={{
          ...mutedTextSx,
          fontSize: "0.82rem",
        }}
      >
        &copy; 2020-{new Date().getFullYear()} Simutopia, LLC.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
