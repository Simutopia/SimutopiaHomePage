import React from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { Link as RouterLink } from "react-router-dom";

const highlights = [
  {
    icon: <InsightsRoundedIcon />,
    title: "Built for engineering teams",
    description:
      "A central workspace for the people advancing design, simulation, and analysis.",
  },
  {
    icon: <Groups2RoundedIcon />,
    title: "People and roles, in sync",
    description:
      "Keep Simutopia team accounts and their workspace roles organized together.",
  },
  {
    icon: <AdminPanelSettingsRoundedIcon />,
    title: "Access, thoughtfully managed",
    description:
      "Authorized administrators control membership and permissions from one place.",
  },
];

function HomePage() {
  return (
    <Box className="landing-page">
      <Box className="landing-orb landing-orb-one" />
      <Box className="landing-orb landing-orb-two" />
      <AppBar position="relative" elevation={0} className="simutopia-navbar">
        <Container maxWidth="lg">
          <Toolbar disableGutters className="landing-toolbar">
            <Box className="simutopia-navbar-brand" aria-label="Simutopia">
              <Box component="img" src="/images/simutopia-mark.png" alt="" />
              <Typography component="span">SIMUTOPIA</Typography>
            </Box>
            <Stack
              component="nav"
              direction="row"
              spacing={{ xs: 0, sm: 0.5 }}
              alignItems="center"
              aria-label="Main navigation"
              className="landing-nav-links"
            >
              {["Home", "About Us", "Projects", "Apps"].map((label) => (
                <Button
                  key={label}
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  className="landing-nav-link"
                >
                  {label}
                </Button>
              ))}
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                component={RouterLink}
                to="/workspace/signin"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                className="top-signin"
              >
                Sign in
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg">
        <Box component="main">
          <Box className="landing-hero">
            <Box className="hero-copy">
              <Chip
                className="hero-badge"
                label="SIMUTOPIA · SECURE WORKSPACE"
                icon={<VerifiedUserRoundedIcon />}
              />
              <Box className="hero-company-logo">
                <Box
                  component="img"
                  src="/images/simutopia-logo.png"
                  alt="Simutopia"
                  className="hero-logo-image"
                />
              </Box>
              <Typography component="h1" className="hero-title">
                ADVANCING DESIGN AND INNOVATION
                <Box component="span" className="hero-title-accent">
                  THROUGH SIMULATION AND ANALYSIS
                </Box>
              </Typography>
              <Typography className="hero-description">
                Welcome to the Simutopia team workspace. Manage people, roles,
                and secure access for the work moving engineering forward.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
                <Button
                  component={RouterLink}
                  to="/workspace/signin"
                  size="large"
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  className="hero-cta"
                >
                  Sign in to Simutopia
                </Button>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box className="trust-dot" />
                  <Typography variant="body2" color="text.secondary">
                    Secure access for Simutopia team members
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={4} className="hero-stats">
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    One
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    connected workspace
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    Every
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    roles, clearly managed
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    Always
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    protected by sign-in
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              className="hero-visual"
              aria-label="Simutopia workspace access overview"
            >
              <Box className="visual-glow" />
              <Card className="workspace-card" elevation={0}>
                <CardContent className="workspace-card-content">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                  >
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        SIMUTOPIA WORKSPACE
                      </Typography>
                      <Typography variant="h6" fontWeight={800}>
                        Team access, in sync
                      </Typography>
                    </Box>
                    <Box className="live-indicator">
                      <Box className="live-dot" />
                      SECURE
                    </Box>
                  </Stack>
                  <Box className="access-chart">
                    <Box className="chart-ring">
                      <Box className="chart-ring-inner">
                        <Typography variant="h4" fontWeight={800}>
                          RBAC
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          access
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="chart-legend">
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          People
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          Teams
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Roles
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          Access
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Admin
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          Control
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box className="access-note">
                    <VerifiedUserRoundedIcon fontSize="small" />
                    <Typography variant="caption">
                      Workspace access for authorized members
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card className="floating-role-card" elevation={0}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box className="role-avatar">A</Box>
                    <Box>
                      <Typography variant="body2" fontWeight={800}>
                        Simutopia administrator
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Manage workspace roles
                      </Typography>
                    </Box>
                    <VerifiedUserRoundedIcon
                      className="verified-small"
                      fontSize="small"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box component="section" className="highlights-section">
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "flex-start", md: "flex-end" }}
              justifyContent="space-between"
              mb={3}
              gap={1}
              className="highlights-heading"
            >
              <Box>
                <Typography variant="overline" color="primary">
                  SIMULATION · DESIGN · ANALYSIS
                </Typography>
                <Typography variant="h4" fontWeight={800} letterSpacing="-0.04em">
                  One workspace. The right access.
                </Typography>
              </Box>
              <Typography color="text.secondary" maxWidth={380}>
                Simutopia’s engineering work deserves a workspace that is just
                as considered: clear roles, trusted access, and people in sync.
              </Typography>
            </Stack>
            <Box className="highlight-grid">
              {highlights.map((highlight, index) => (
                <Card
                  key={highlight.title}
                  className="highlight-card"
                  elevation={0}
                  style={{ "--card-delay": `${index * 100}ms` }}
                >
                  <CardContent>
                    <Box className="highlight-icon">{highlight.icon}</Box>
                    <Typography variant="h6" fontWeight={800} mb={1}>
                      {highlight.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {highlight.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        <Box component="footer" className="landing-footer">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Simutopia · Advancing design and
            innovation through simulation and analysis.
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
            >
              simutopia.com
            </Button>
            <Button
              component={RouterLink}
              to="/workspace/signin"
              color="inherit"
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
