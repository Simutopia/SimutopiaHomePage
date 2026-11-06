import React, { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import HomePage from "./components/homepage";
import Signin from "./components/signin/signin";
import { SnackbarProvider } from "./components/snackbar";
import MainPage from "./components/dashboard/mainpage";
import { PopperProvider } from "./components/poppercontext";
import API from "./constants";
import "./App.css";

function RequireSession({ children, adminOnly = false }) {
  const location = useLocation();
  const [session, setSession] = useState({ loading: true, user: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("user");
      setSession({ loading: false, user: null });
      return undefined;
    }

    const controller = new AbortController();
    const verifySession = async () => {
      try {
        const response = await fetch(
          `${API.DATA_URL}${API.DATA_ENDPOINTS.currentUser}`,
          {
            headers: { "x-auth-token": token },
            signal: controller.signal,
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Your session is no longer valid.");
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(
          new CustomEvent("workspace-session-updated", { detail: data.user })
        );
        setSession({ loading: false, user: data.user });
      } catch (error) {
        if (error.name === "AbortError") return;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setSession({ loading: false, user: null });
      }
    };

    verifySession();
    const intervalId = window.setInterval(verifySession, 60_000);
    return () => {
      window.clearInterval(intervalId);
      controller.abort();
    };
  }, [location.pathname]);

  if (session.loading) {
    return (
      <Box className="route-loader" role="status" aria-label="Checking session">
        <CircularProgress />
      </Box>
    );
  }

  if (!session.user) {
    return (
      <Navigate
        to="/workspace/signin"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (adminOnly && !session.user.roleId?.permissions?.role_management) {
    return <Navigate to="/workspace/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={<HomePage />}
      />
      <Route
        path="signin"
        element={<Signin />}
      />
      <Route
        path="dashboard"
        element={
          <RequireSession>
            <MainPage />
          </RequireSession>
        }
      />
      <Route
        path="admin"
        element={
          <RequireSession adminOnly>
            <MainPage />
          </RequireSession>
        }
      />
      <Route path="signup" element={<Navigate to="/workspace" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RbacApp() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#0076a8" },
          secondary: { main: "#e19a00" },
          background: { default: "#f3f6f8", paper: "#ffffff" },
          text: { primary: "#202b33", secondary: "#596a75" },
        },
        shape: { borderRadius: 8 },
        typography: {
          fontFamily: '"Arial", "Helvetica Neue", sans-serif',
          h4: { fontWeight: 700, letterSpacing: "-0.025em" },
          h5: { fontWeight: 700, letterSpacing: "-0.02em" },
          h6: { fontWeight: 700 },
          button: { textTransform: "none", fontWeight: 600 },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                boxShadow: "0 1px 3px rgba(20, 45, 60, 0.14)",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                border: "1px solid #d7e1e6",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: { boxShadow: "0 2px 8px rgba(16, 44, 60, 0.06)" },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: { borderRadius: 6 },
              containedPrimary: {
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              head: {
                color: "#24343d",
                backgroundColor: "#e9f1f5",
                fontWeight: 700,
                whiteSpace: "nowrap",
              },
              root: {
                borderColor: "#e0e7eb",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: { borderRadius: 6 },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <PopperProvider>
          <Box className="workspace-theme">
            <AppRoutes />
          </Box>
        </PopperProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default RbacApp;
