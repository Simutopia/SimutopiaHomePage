import { useEffect, useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavbarScrollButtons from "./NavbarScrollButtons";
import { colors, fonts } from "../theme/tokens";

export const HEADER_HEIGHT = 72;

const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const overDarkHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  return (
    <AppBar
      id="mainNavbar"
      position="sticky"
      elevation={0}
      sx={{
        color: colors.ink,
        fontFamily: fonts.sans,
        bgcolor: overDarkHero
          ? "rgba(255,255,255,0.78)"
          : "rgba(255,255,255,0.72)",
        backgroundImage: "none",
        backdropFilter: "blur(18px) saturate(1.25)",
        WebkitBackdropFilter: "blur(18px) saturate(1.25)",
        borderBottom: `1px solid ${
          overDarkHero ? "rgba(255,255,255,0.35)" : colors.border
        }`,
        boxShadow: scrolled
          ? "0 8px 24px rgba(33, 37, 41, 0.06)"
          : "none",
        transition:
          "background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
        "& .MuiTypography-root, & .MuiButton-root, & .MuiIconButton-root": {
          fontFamily: fonts.sans,
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: HEADER_HEIGHT, sm: HEADER_HEIGHT },
          height: HEADER_HEIGHT,
          gap: { xs: 0.5, sm: 1 },
          px: { xs: 1.5, sm: 2.5 },
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "inherit",
            textDecoration: "none",
            mr: { xs: 0, lg: 1.5 },
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src="/images/logoSFullRes.png"
            alt=""
            sx={{ height: 40, width: { xs: 18, sm: 22 }, objectFit: "contain" }}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: fonts.sans,
              fontSize: { xs: "1.25rem", sm: "1.65rem" },
              fontWeight: 300,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              color: colors.logoWordmark,
              lineHeight: 1,
            }}
          >
            <Box component="strong" sx={{ fontWeight: 700, color: "inherit" }}>
              SIM
            </Box>
            UTOPIA
          </Typography>
        </Box>
        <NavbarScrollButtons />
        <Button
          component={RouterLink}
          to="/workspace/signin"
          variant="outlined"
          sx={{
            ml: { xs: "auto", lg: 1 },
            flexShrink: 0,
            fontFamily: fonts.sans,
            color: colors.body,
            borderColor: "rgba(43, 46, 50, 0.22)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            letterSpacing: "0.02em",
            px: 1.75,
            py: 0.6,
            borderRadius: 1.25,
            "&:hover": {
              borderColor: colors.ink,
              bgcolor: "rgba(43, 46, 50, 0.04)",
              color: colors.ink,
            },
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
