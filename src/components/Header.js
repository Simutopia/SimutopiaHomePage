import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavbarScrollButtons from "./NavbarScrollButtons";

const Header = () => (
  <AppBar
    id="mainNavbar"
    position="sticky"
    elevation={0}
    sx={{ bgcolor: "#212529", color: "common.white" }}
  >
    <Toolbar sx={{ minHeight: 80, gap: { xs: 0.5, sm: 1 }, px: { xs: 1, sm: 2 } }}>
      <Box
        component="a"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "inherit",
          textDecoration: "none",
          mr: { xs: 0, lg: 2 },
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src="/images/logoSFullRes.png"
          alt=""
          sx={{ height: 48, width: { xs: 22, sm: 26 }, objectFit: "contain" }}
        />
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2.5rem" },
            fontWeight: 200,
            letterSpacing: "0.65px",
            whiteSpace: "nowrap",
          }}
        >
          <strong>SIM</strong>UTOPIA
        </Typography>
      </Box>
      <NavbarScrollButtons />
      <Button
        component={RouterLink}
        to="/workspace/signin"
        variant="outlined"
        color="inherit"
        sx={{ ml: { xs: "auto", lg: 1 }, flexShrink: 0 }}
      >
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
