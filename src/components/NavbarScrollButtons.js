import { useState } from "react";
import {
  Button,
  IconButton,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { colors, fonts } from "../theme/tokens";

const whatWeDoLinks = [
  ["Products", "/products"],
  ["Services", "/services"],
  ["Case Studies", "/case-studies"],
];

const primaryLinks = [
  ["Home", "/"],
  ["Who We Are", "/about"],
  ["Contact Us", "/contact"],
];

const navButtonSx = (active) => ({
  fontFamily: fonts.sans,
  fontSize: "0.98rem",
  fontWeight: active ? 600 : 500,
  letterSpacing: "0.02em",
  textTransform: "none",
  whiteSpace: "nowrap",
  color: active ? colors.ink : colors.body,
  minWidth: "auto",
  px: 1.25,
  py: 0.5,
  borderRadius: 1,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 6,
    height: 2,
    borderRadius: 999,
    bgcolor: colors.accentSoft,
    opacity: active ? 1 : 0,
    transform: active ? "scaleX(1)" : "scaleX(0.6)",
    transition: "opacity 160ms ease, transform 160ms ease",
  },
  "&:hover": {
    bgcolor: "rgba(43, 46, 50, 0.04)",
    color: colors.ink,
  },
});

const NavbarScrollButtons = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [whatWeDoAnchor, setWhatWeDoAnchor] = useState(null);
  const isMobile = useMediaQuery("(max-width: 991.98px)");
  const { pathname } = useLocation();

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const whatWeDoActive = whatWeDoLinks.some(([, to]) => isActive(to));

  const closeMobileMenu = () => setMenuAnchor(null);
  const closeWhatWeDo = () => setWhatWeDoAnchor(null);

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Open page navigation"
          aria-controls={menuAnchor ? "page-navigation-menu" : undefined}
          aria-haspopup="true"
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={{ color: colors.ink }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Menu
          id="page-navigation-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMobileMenu}
          MenuListProps={{ "aria-label": "Main navigation" }}
        >
          <MenuItem
            component={RouterLink}
            to="/"
            selected={isActive("/")}
            onClick={closeMobileMenu}
          >
            Home
          </MenuItem>
          <ListSubheader
            sx={{
              bgcolor: "transparent",
              lineHeight: 2,
              fontWeight: 700,
              color: colors.soft,
            }}
          >
            What We Do
          </ListSubheader>
          {whatWeDoLinks.map(([label, to]) => (
            <MenuItem
              key={to}
              component={RouterLink}
              to={to}
              selected={isActive(to)}
              onClick={closeMobileMenu}
              sx={{ pl: 4 }}
            >
              {label}
            </MenuItem>
          ))}
          {primaryLinks
            .filter(([, to]) => to !== "/")
            .map(([label, to]) => (
              <MenuItem
                key={to}
                component={RouterLink}
                to={to}
                selected={isActive(to)}
                onClick={closeMobileMenu}
              >
                {label}
              </MenuItem>
            ))}
        </Menu>
      </>
    );
  }

  return (
    <Stack
      component="nav"
      direction="row"
      aria-label="Main navigation"
      spacing={0.25}
      sx={{ flexGrow: 1, ml: 1.5, alignItems: "center" }}
    >
      <Button
        component={RouterLink}
        to="/"
        aria-current={isActive("/") ? "page" : undefined}
        sx={navButtonSx(isActive("/"))}
      >
        Home
      </Button>

      <Button
        aria-haspopup="menu"
        aria-expanded={Boolean(whatWeDoAnchor) ? "true" : undefined}
        aria-controls={whatWeDoAnchor ? "what-we-do-menu" : undefined}
        onClick={(event) => setWhatWeDoAnchor(event.currentTarget)}
        endIcon={
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: "1.1rem !important" }} />
        }
        sx={navButtonSx(whatWeDoActive)}
      >
        What We Do
      </Button>
      <Menu
        id="what-we-do-menu"
        anchorEl={whatWeDoAnchor}
        open={Boolean(whatWeDoAnchor)}
        onClose={closeWhatWeDo}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        MenuListProps={{ "aria-label": "What we do" }}
      >
        {whatWeDoLinks.map(([label, to]) => (
          <MenuItem
            key={to}
            component={RouterLink}
            to={to}
            selected={isActive(to)}
            onClick={closeWhatWeDo}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

      {primaryLinks
        .filter(([, to]) => to !== "/")
        .map(([label, to]) => (
          <Button
            key={to}
            component={RouterLink}
            to={to}
            aria-current={isActive(to) ? "page" : undefined}
            sx={navButtonSx(isActive(to))}
          >
            {label}
          </Button>
        ))}
    </Stack>
  );
};

export default NavbarScrollButtons;
