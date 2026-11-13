import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSnackbar } from "../../snackbar";
import API from "../../../constants";

function Home({ role, editable }) {
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const showSnackbar = useSnackbar();

  // Change Password State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const handleOpenChangePassword = () => setIsChangePasswordOpen(true);
  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async (e) => {
    if (e) e.preventDefault();
    if (newPassword !== confirmPassword) {
      showSnackbar("New passwords do not match.", 3000, "error");
      return;
    }
    if (newPassword.length < 8) {
      showSnackbar("Password must be at least 8 characters.", 3000, "error");
      return;
    }

    setIsSubmittingPassword(true);
    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.editPassword}/${userDetails?.id}/password`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentPassword, password: newPassword }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showSnackbar(data.message || "Unable to update password.", 3000, "error");
        return;
      }

      showSnackbar("Security credentials updated successfully!", 3000, "success");
      handleCloseChangePassword();
    } catch {
      showSnackbar("Unable to update password. Please check your connection.", 3000, "error");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${API.DATA_URL}${API.DATA_ENDPOINTS.currentUser}`,
          { credentials: "include" }
        );
        const data = await response.json();
        if (response.ok && data.user) {
          setUserDetails(data.user);
          setName(data.user.name);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleEditToggle = async () => {
    if (editing && name.trim() && name.trim() !== userDetails?.name) {
      try {
        const response = await fetch(
          `${API.DATA_URL}${API.DATA_ENDPOINTS.editUserDetails}${userDetails.id}/edit`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name.trim() }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          showSnackbar(data.message || "Failed to update profile name.", 3000, "error");
          return;
        }

        setUserDetails((prev) => ({ ...prev, name: data.user.name }));
        showSnackbar("Profile updated successfully.", 3000, "success");
      } catch {
        showSnackbar("Failed to update profile name.", 3000, "error");
      }
    }
    setEditing(!editing);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", pb: 4 }}>
      {userDetails ? (
        <Stack spacing={3}>
          {/* Main Identity Command Banner */}
          <Paper
            elevation={0}
            className="sim-glass-card"
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3.5,
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.95) 100%)",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2.5}
            >
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      width: 68,
                      height: 68,
                      fontSize: "1.7rem",
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #0076a8 0%, #6366f1 100%)",
                      boxShadow: "0 8px 24px -4px rgba(0, 118, 168, 0.4)",
                      border: "3px solid #ffffff",
                    }}
                  >
                    {userDetails.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box
                    className="sim-live-beacon"
                    sx={{
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      width: 12,
                      height: 12,
                      border: "2px solid #fff",
                    }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {editing ? (
                      <TextField
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        sx={{ minWidth: 200 }}
                      />
                    ) : (
                      <Typography variant="h5" fontWeight={800} color="#0f172a">
                        {userDetails.name}
                      </Typography>
                    )}

                    {editable && (
                      <IconButton
                        size="small"
                        onClick={handleEditToggle}
                        sx={{
                          bgcolor: editing ? "#10b981" : "rgba(0, 118, 168, 0.08)",
                          color: editing ? "#fff" : "#0076a8",
                          "&:hover": { bgcolor: editing ? "#059669" : "rgba(0, 118, 168, 0.15)" },
                        }}
                      >
                        {editing ? <CheckIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                      </IconButton>
                    )}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                    {userDetails.email}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }} flexWrap="wrap">
                    <Chip
                      size="small"
                      icon={<ShieldRoundedIcon sx={{ "&&": { fontSize: 13 } }} />}
                      label={role?.roleName ? role.roleName.toUpperCase() : "STANDARD IDENTITY"}
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.68rem",
                        bgcolor: "#eff6ff",
                        color: "#1d4ed8",
                        border: "1px solid #bfdbfe",
                      }}
                    />

                    {userDetails.organization && (
                      <Chip
                        size="small"
                        icon={<BusinessRoundedIcon sx={{ "&&": { fontSize: 13 } }} />}
                        label={userDetails.organization}
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          bgcolor: "#f0fdf4",
                          color: "#15803d",
                          border: "1px solid #bbf7d0",
                        }}
                      />
                    )}

                    <Chip
                      size="small"
                      label={`Node ID: ${String(userDetails.id).slice(-6)}`}
                      className="sim-telemetry-chip"
                      sx={{ bgcolor: "#f1f5f9", color: "#475569" }}
                    />
                  </Stack>
                </Box>
              </Stack>

              <Button
                variant="outlined"
                color="primary"
                startIcon={<KeyRoundedIcon />}
                onClick={handleOpenChangePassword}
                sx={{
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: "none",
                  px: 2,
                  py: 0.8,
                  borderColor: "#cbd5e1",
                  bgcolor: "#ffffff",
                  "&:hover": { borderColor: "#0076a8", bgcolor: "#f0f9ff" },
                }}
              >
                Change Password
              </Button>
            </Stack>
          </Paper>
        </Stack>
      ) : (
        <Paper elevation={0} className="sim-glass-card" sx={{ p: 6, textAlign: "center" }}>
          <Typography color="text.secondary">Loading innovation profile…</Typography>
        </Paper>
      )}

      {/* Futuristic Change Password Dialog */}
      <Dialog
        open={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3.5, p: 1 },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "rgba(0, 118, 168, 0.12)", color: "#0076a8", width: 40, height: 40 }}>
              <KeyRoundedIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Security Credentials
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Update your account password
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={handleCloseChangePassword}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleChangePassword}>
          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2}>
              <TextField
                label="Current Password"
                type="password"
                size="small"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <TextField
                label="New Password"
                type="password"
                size="small"
                fullWidth
                helperText="Minimum 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <TextField
                label="Confirm New Password"
                type="password"
                size="small"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={handleCloseChangePassword} color="inherit" sx={{ borderRadius: 2, textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmittingPassword || !currentPassword || !newPassword || newPassword !== confirmPassword}
              sx={{ borderRadius: 2, fontWeight: 700, textTransform: "none", px: 2.5 }}
            >
              {isSubmittingPassword ? "Updating…" : "Update Password"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Home;
