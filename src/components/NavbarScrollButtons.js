import { useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const sections = [
  ["Industries", "industriesTarget"],
  ["Services", "servicesTarget"],
  ["About Us", "aboutUsTarget"],
  ["Contact Us", "contactTarget"],
];

const NavbarScrollButtons = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMobile = useMediaQuery("(max-width: 991.98px)");

  const handleScrollClick = (destination) => {
    const target = document.getElementById(destination);
    setMenuAnchor(null);
    if (!target) return;

    const offset = window.innerWidth <= 768 ? 270 : 85;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  if (isMobile) {
    return (
      <>
        <IconButton
          color="inherit"
          aria-label="Open page navigation"
          aria-controls={menuAnchor ? "page-navigation-menu" : undefined}
          aria-haspopup="true"
          onClick={(event) => setMenuAnchor(event.currentTarget)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Menu
          id="page-navigation-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          MenuListProps={{ "aria-label": "Main navigation" }}
        >
          {sections.map(([label, id]) => (
            <MenuItem key={id} onClick={() => handleScrollClick(id)}>
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
      sx={{ flexGrow: 1, ml: 2 }}
    >
      {sections.map(([label, id]) => (
        <Button
          key={id}
          color="inherit"
          sx={{ fontSize: "1.25rem", whiteSpace: "nowrap" }}
          onClick={() => handleScrollClick(id)}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};

export default NavbarScrollButtons;
