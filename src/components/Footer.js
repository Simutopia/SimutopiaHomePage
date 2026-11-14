import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { colors, fonts } from "../theme/tokens";

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
        py: { xs: 2.5, md: 3 },
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
            fontFamily: fonts.sans,
            color: colors.muted,
            fontSize: "0.9rem",
          }}
        >
          &copy; 2020-{new Date().getFullYear()} Simutopia, LLC.
        </Typography>
        {!hideFooterCtas ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Link
              href="mailto:consulting@simutopia.com"
              underline="hover"
              sx={{
                fontFamily: fonts.sans,
                color: colors.body,
                fontSize: "0.9rem",
                fontWeight: 500,
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
                px: 2.25,
                py: 0.85,
                fontFamily: fonts.sans,
                fontWeight: 700,
                fontSize: "0.9rem",
                textTransform: "none",
                borderRadius: 1.5,
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
