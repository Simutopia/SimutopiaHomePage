import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import UserManagement from "./pages/usermanagement";
import RoleManagement from "./pages/rolemanagement";
import AppManagement from "./pages/appmanagement";
import MyApps from "./pages/myapps";
import { useSnackbar } from "../snackbar";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAdminDashboard = location.pathname === "/workspace/admin";

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    } catch (error) {
      console.error("Unable to read the verified user session:", error);
      setUser(null);
    }

    const handleSessionUpdate = (event) => {
      setUser(event.detail);
    };
    window.addEventListener("workspace-session-updated", handleSessionUpdate);
    return () =>
      window.removeEventListener(
        "workspace-session-updated",
        handleSessionUpdate
      );
  }, []);

  const role = user?.roleId;
  const menuItems = useMemo(() => {
    const permissions = role?.permissions || {};
    const items = [];

    if (permissions.view_personal_details) {
      items.push({
        label: "Overview",
        icon: <HomeOutlinedIcon />,
        component: <Home role={role} editable={permissions.edit} />,
      });
    }
    if (permissions.view_all_users) {
      items.push({
        label: "User management",
        icon: <GroupsOutlinedIcon />,
        component: <UserManagement />,
      });
    }
    if (permissions.role_management) {
      items.push({
        label: "Roles & permissions",
        icon: <SecurityOutlinedIcon />,
        component: <RoleManagement />,
      });
      items.push({
        label: "App management",
        icon: <AppsOutlinedIcon />,
        component: <AppManagement />,
      });
    }
    // Access Requests is currently unused; restore its menu item when enabled.
    items.push({
      label: "My apps",
      icon: <AppsOutlinedIcon />,
      component: <MyApps />,
    });
    return items;
  }, [role]);

  useEffect(() => {
    if (!menuItems.some((item) => item.label === selectedSection)) {
      setSelectedSection(menuItems[0]?.label || "");
    }
  }, [menuItems, selectedSection]);

  const currentSection = menuItems.find(
    (item) => item.label === selectedSection
  );
  const displayName = user?.name || "Member";

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/users/logout`,
        { method: "POST", credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Central Auth could not end the SSO session.");
      }
    } catch (error) {
      console.error("Unable to clear the SSO session cookie:", error);
      showSnackbar("Unable to sign out completely. Please retry.", 4000, "error");
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/workspace/signin", { replace: true });
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setMobileOpen(false);
  };

  const drawer = (
    <Box className="workspace-drawer-content">
      <Box className="workspace-drawer-heading">
        <Typography variant="overline">WORKSPACE</Typography>
        <Typography variant="h6">
          {isAdminDashboard ? "Administration" : "My workspace"}
        </Typography>
      </Box>
      <Divider />
      <List className="workspace-nav-list" aria-label="Workspace sections">
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={selectedSection === item.label}
            onClick={() => handleSelectSection(item.label)}
            className="workspace-nav-item"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box className="workspace-drawer-footer">
        <Typography variant="caption">SIMUTOPIA · CENTRAL ACCESS</Typography>
      </Box>
    </Box>
  );

  return (
    <Box className="workspace-dashboard">
      <AppBar position="fixed" className="workspace-appbar">
        <Toolbar className="workspace-toolbar">
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              aria-label="Open workspace navigation"
              sx={{ mr: 1 }}
            >
              <MenuRoundedIcon />
            </IconButton>
          )}
          <Box className="workspace-brand">
            <Box component="img" src="/images/simutopia-mark.png" alt="" />
            <Typography component="span">SIMUTOPIA</Typography>
          </Box>
          <Box className="workspace-toolbar-divider" />
          <Typography className="workspace-toolbar-title" noWrap>
            {isAdminDashboard ? "Admin control center" : "Team workspace"}
          </Typography>
          <Box className="workspace-toolbar-actions">
            {!isMobile && (
              <Box className="workspace-user">
                <Avatar className="workspace-user-avatar">
                  {displayName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2" noWrap>
                  {displayName}
                </Typography>
              </Box>
            )}
            <Tooltip title="Sign out">
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleLogout}
                aria-label="Sign out"
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        className="workspace-sidebar"
        aria-label="Workspace navigation"
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            className="workspace-mobile-drawer"
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer variant="permanent" open className="workspace-permanent-drawer">
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box component="main" className="workspace-main">
        <Box className="workspace-page-heading">
          <Typography variant="overline">
            {isAdminDashboard ? "ADMINISTRATION" : "SIMUTOPIA WORKSPACE"}
          </Typography>
          <Typography variant="h4" component="h1">
            {currentSection?.label || "Workspace"}
          </Typography>
          <Typography color="text.secondary">
            {isAdminDashboard
              ? "Manage members, roles, and apps."
              : "Your account and team access at a glance."}
          </Typography>
        </Box>
        {currentSection ? (
          <Box className="workspace-content">{currentSection.component}</Box>
        ) : (
          <Box className="workspace-empty">
            <Typography variant="h6">No workspace sections available</Typography>
            <Typography color="text.secondary">
              Your account does not currently have access to a workspace section.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AppLayout;
