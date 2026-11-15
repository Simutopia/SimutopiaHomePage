import { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { fonts } from "../theme/tokens";

const PublicLayout = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <Box
      className="simutopia-site"
      sx={{
        fontFamily: fonts.sans,
        "& .MuiTypography-root, & .MuiButton-root, & .MuiLink-root": {
          fontFamily: fonts.sans,
        },
      }}
    >
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default PublicLayout;
