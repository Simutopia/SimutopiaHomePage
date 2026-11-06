import React, { useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "../snackbar";
import API from "../../constants";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const getSsoReturnUrl = () => {
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    if (!returnTo) {
      return null;
    }

    try {
      const target = new URL(returnTo);
      const api = new URL(API.DATA_URL);
      if (
        target.origin !== api.origin ||
        target.pathname !== "/api/sso/authorize" ||
        target.protocol !== api.protocol
      ) {
        return null;
      }
      return target.toString();
    } catch {
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(API.DATA_URL + API.DATA_ENDPOINTS.signin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to sign in. Please try again.");
        return;
      }

      if (!data.token || !data.user) {
        throw new Error("The server returned an invalid sign-in response.");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      const ssoReturnUrl = getSsoReturnUrl();
      if (ssoReturnUrl) {
        window.location.assign(ssoReturnUrl);
        return;
      }
      showSnackbar("Welcome back.", 2500, "success");
      navigate(
        data.user.roleId?.permissions?.role_management
          ? "/workspace/admin"
          : "/workspace/dashboard",
        { replace: true }
      );
    } catch (error) {
      console.error("Sign-in failed:", error);
      setErrorMessage(
        error.message || "Unable to connect. Please try again shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="signin-page">
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              className="signin-brand"
            >
              <Box component="img" src="/images/simutopia-mark.png" alt="" />
              <Typography component="span">SIMUTOPIA</Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="sm" className="signin-container">
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          className="signin-card"
        >
          <Stack spacing={2.5} alignItems="stretch">
            <Box className="signin-icon">
              <Box component="img" src="/images/simutopia-mark.png" alt="" />
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} letterSpacing="-0.05em">
                Simutopia workspace
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Sign in to securely access your team workspace.
              </Typography>
            </Box>

            {errorMessage && (
              <Alert severity="error" role="alert">
                {errorMessage}
              </Alert>
            )}

            <TextField
              label="Company email"
              type="email"
              autoComplete="username"
              required
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              className="signin-submit"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Typography variant="caption" textAlign="center" color="text.secondary">
              Access is available to authorized workspace members.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signin;
