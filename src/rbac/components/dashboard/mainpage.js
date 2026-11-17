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
  Stack,
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
import API from "../../constants";

const AppLayout = ({ currentUser }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAdminDashboard = location.pathname === "/workspace/admin";

  const role = currentUser?.roleId;
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
  const displayName = currentUser?.name || "Member";

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.logout}`,
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

    navigate("/workspace/signin", { replace: true });
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setMobileOpen(false);
  };

  const drawer = (
    <Box className="workspace-drawer-content">
      <Box className="workspace-drawer-heading" sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#00b4d8",
              boxShadow: "0 0 10px #00b4d8",
            }}
          />
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.15em",
              fontWeight: 800,
              color: "#0076a8",
              fontSize: "0.68rem",
            }}
          >
            SIMULATION SUITE
          </Typography>
        </Stack>
        <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.01em", color: "#0f172a" }}>
          {isAdminDashboard ? "Admin Command" : "Team Platform"}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#f1f5f9" }} />
      <List className="workspace-nav-list" aria-label="Workspace sections" sx={{ py: 1.5 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={selectedSection === item.label}
            onClick={() => handleSelectSection(item.label)}
            className="workspace-nav-item"
          >
            <ListItemIcon sx={{ minWidth: 38 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "0.92rem",
                fontWeight: selectedSection === item.label ? 700 : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Box
        className="workspace-drawer-footer"
        sx={{
          bgcolor: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          p: 2,
        }}
      >
      </Box>
    </Box>
  );

  return (
    <Box className="workspace-dashboard">
      <AppBar position="fixed" className="workspace-appbar">
        <Toolbar className="workspace-toolbar" sx={{ minHeight: "68px !important" }}>
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
          <Box className="workspace-brand" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src="/images/simutopia-mark.png"
              alt=""
              sx={{
                width: 28,
                height: 38,
                filter: "drop-shadow(0 0 8px rgba(0, 180, 216, 0.4))",
              }}
            />
            <Typography
              component="span"
              sx={{
                fontWeight: 800,
                letterSpacing: "0.08em",
                background: "linear-gradient(90deg, #ffffff 0%, #00b4d8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SIMUTOPIA
            </Typography>
          </Box>

          <Box className="workspace-toolbar-divider" />


          <Box className="workspace-toolbar-actions" sx={{ ml: "auto" }}>
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: "linear-gradient(135deg, #0076a8 0%, #6366f1 100%)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {displayName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 700, lineHeight: 1.2 }}>
                    {displayName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.68rem" }}>
                    {currentUser?.roleId?.roleName || "Member"}
                  </Typography>
                </Box>
              </Box>
            )}

            <Tooltip title="Secure Sign out">
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleLogout}
                aria-label="Sign out"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                  "&:hover": { bgcolor: "rgba(239, 68, 68, 0.2)", color: "#f87171" },
                  ml: 1,
                }}
              >
                <LogoutRoundedIcon fontSize="small" />
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
        {/* Dynamic Telemetry Heading */}
        <Box className="workspace-page-heading" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.14em",
                fontWeight: 800,
                color: "#0076a8",
                fontSize: "0.72rem",
              }}
            >
              {isAdminDashboard ? "CENTRAL COMMAND // ADMIN" : "COLLABORATION ENGINE // WORKSPACE"}
            </Typography>
          </Stack>

          <Typography
            variant="h4"
            component="h1"
            fontWeight={800}
            sx={{
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #0f172a 0%, #0076a8 60%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {currentSection?.label || "Workspace"}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
            {isAdminDashboard
              ? "Enterprise identity, multi-tenant organizations, access rules, and simulation integrations."
              : "Access your cloud simulators, manage assigned workspace entities, and monitor execution state."}
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
