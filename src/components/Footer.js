import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { buttonLabelSx, colors, fonts, mutedTextSx } from "../theme/tokens";

const Footer = () => {
  const { pathname } = useLocation();
  const hideFooterCtas =
    pathname === "/" || pathname.startsWith("/contact");

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        bgcolor: colors.white,
        color: colors.muted,
        fontFamily: fonts.sans,
        py: { xs: 1.5, md: 1.75 },
        borderTop: `1px solid ${colors.border}`,
        "& .MuiTypography-root, & .MuiButton-root, & .MuiLink-root": {
          fontFamily: fonts.sans,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            ...mutedTextSx,
            fontSize: "0.82rem",
          }}
        >
          &copy; 2020-{new Date().getFullYear()} Simutopia, LLC.
        </Typography>
        {!hideFooterCtas ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link
              href="mailto:consulting@simutopia.com"
              underline="hover"
              sx={{
                ...mutedTextSx,
                fontSize: "0.82rem",
                fontWeight: 500,
                color: colors.body,
                textDecoration: "none",
              }}
            >
              consulting@simutopia.com
            </Link>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              disableElevation
              sx={{
                ...buttonLabelSx,
                px: 1.75,
                py: 0.55,
                fontWeight: 700,
                fontSize: "0.82rem",
                borderRadius: 1.25,
                bgcolor: colors.accentSoft,
                color: colors.ink,
                "&:hover": {
                  bgcolor: colors.accent,
                  color: colors.white,
                },
              }}
            >
              Talk to us
            </Button>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Footer;
