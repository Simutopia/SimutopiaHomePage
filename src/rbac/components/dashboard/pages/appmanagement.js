import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import API from "../../../constants";
import { useSnackbar } from "../../snackbar";

// Vibrant gradient palette for app icons
const APP_GRADIENTS = [
  "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
  "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
  "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
  "linear-gradient(135deg, #e11d48 0%, #fb7185 100%)",
  "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
  "linear-gradient(135deg, #0284c7 0%, #22d3ee 100%)",
];

const getAppGradient = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % APP_GRADIENTS.length;
  return APP_GRADIENTS[index];
};

const getAppInitials = (name = "") => {
  const parts = name.trim().split(/[\s-_]+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (name.trim().slice(0, 2) || "AP").toUpperCase();
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API.DATA_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "App request failed.");
  }
  return data;
};

const AppManagement = () => {
  const [apps, setApps] = useState([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Form states for creating new app
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [clientType, setClientType] = useState("public");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [url, setUrl] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");

  // Edit app dialog state
  const [editingApp, setEditingApp] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    downloadUrl: "",
    url: "",
    callbackUrl: "",
    enabled: true,
  });

  const [secretDisclosure, setSecretDisclosure] = useState(null);
  const [saving, setSaving] = useState(false);
  const showSnackbar = useSnackbar();

  const refreshApps = useCallback(async () => {
    const data = await request(API.DATA_ENDPOINTS.apps);
    setApps(data.apps || []);
  }, []);

  useEffect(() => {
    refreshApps().catch((error) => {
      console.error("Unable to load apps:", error);
      showSnackbar(error.message, 3500, "error");
    });
  }, [refreshApps, showSnackbar]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setKey((current) =>
      current === "" ||
      current ===
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
        ? value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
        : current
    );
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const data = await request(API.DATA_ENDPOINTS.apps, {
        method: "POST",
        body: JSON.stringify({
          name,
          key,
          clientType,
          description,
          imageUrl,
          videoUrl,
          downloadUrl,
          url,
          ...(clientType === "confidential" ? { callbackUrl } : {}),
        }),
      });
      setSecretDisclosure(
        data.clientSecret
          ? { appName: data.app.name, value: data.clientSecret }
          : null
      );
      setName("");
      setKey("");
      setDescription("");
      setImageUrl("");
      setVideoUrl("");
      setDownloadUrl("");
      setUrl("");
      setCallbackUrl("");
      setShowRegisterForm(false);
      await refreshApps();
      showSnackbar(
        data.app.clientType === "public"
          ? "Browser app added. Configure role access in Roles & permissions."
          : "Server app added. Configure role access in Roles & permissions.",
        4000,
        "success"
      );
    } catch (error) {
      showSnackbar(error.message, 3500, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenEdit = (app) => {
    setEditingApp(app);
    setEditForm({
      name: app.name || "",
      description: app.description || "",
      imageUrl: app.imageUrl || "",
      videoUrl: app.videoUrl || "",
      downloadUrl: app.downloadUrl || "",
      url: app.url || "",
      callbackUrl: app.callbackUrl || "",
      enabled: Boolean(app.enabled),
    });
  };

  const handleSaveEdit = async () => {
    if (!editingApp) return;
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(editingApp.key)}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: editForm.name,
            description: editForm.description,
            imageUrl: editForm.imageUrl,
            videoUrl: editForm.videoUrl,
            downloadUrl: editForm.downloadUrl,
            url: editForm.url,
            ...(editingApp.clientType !== "public"
              ? { callbackUrl: editForm.callbackUrl }
              : {}),
            enabled: editForm.enabled,
          }),
        }
      );
      setApps((current) =>
        current.map((item) => (item.key === editingApp.key ? data.app : item))
      );
      setEditingApp(null);
      showSnackbar("Application updated successfully.", 3000, "success");
    } catch (error) {
      showSnackbar(error.message, 3500, "error");
    }
  };

  const handleToggle = async (app) => {
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(app.key)}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: app.name,
            description: app.description,
            imageUrl: app.imageUrl,
            videoUrl: app.videoUrl,
            downloadUrl: app.downloadUrl,
            url: app.url,
            ...(app.clientType !== "public"
              ? { callbackUrl: app.callbackUrl }
              : {}),
            enabled: !app.enabled,
          }),
        }
      );
      setApps((current) =>
        current.map((item) => (item.key === app.key ? data.app : item))
      );
      showSnackbar(data.message, 3000, "success");
    } catch (error) {
      showSnackbar(error.message, 3500, "error");
    }
  };

  const handleRotateSecret = async (app) => {
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(app.key)}/rotate-secret`,
        { method: "POST" }
      );
      setSecretDisclosure({ appName: app.name, value: data.clientSecret });
    } catch (error) {
      showSnackbar(error.message, 3500, "error");
    }
  };

  const handleDelete = async (app) => {
    if (!window.confirm(`Are you sure you want to delete "${app.name}"? This will revoke all role grants.`)) {
      return;
    }
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(app.key)}`,
        { method: "DELETE" }
      );
      setApps((current) => current.filter((item) => item.key !== app.key));
      showSnackbar(`${data.message}. Its role grants have been revoked.`, 4000, "success");
    } catch (error) {
      showSnackbar(error.message, 3500, "error");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
      {/* Header & Stats Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid #e2e8f0",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Manage Applications
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 650 }}>
              Register external apps, configure rich multimedia descriptions (pictures, videos, long descriptions), manage client secrets, and link downloadable packages.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
              <Chip size="small" label={`Total Apps: ${apps.length}`} color="primary" variant="outlined" />
              <Chip size="small" label={`Active: ${apps.filter((a) => a.enabled).length}`} color="success" />
              <Chip size="small" label={`Browser PKCE: ${apps.filter((a) => a.clientType === "public").length}`} />
              <Chip size="small" label={`Server SSO: ${apps.filter((a) => a.clientType !== "public").length}`} />
            </Stack>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={() => setShowRegisterForm((prev) => !prev)}
            sx={{
              borderRadius: 2.5,
              px: 2.5,
              py: 1,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(0, 118, 168, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            {showRegisterForm ? "Hide Form" : "Register New App"}
          </Button>
        </Stack>
      </Paper>

      {/* Secret Disclosure Alert */}
      {secretDisclosure && (
        <Alert
          severity="warning"
          sx={{ mb: 3, borderRadius: 2.5 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                if (!navigator.clipboard?.writeText) {
                  showSnackbar("Select and copy the secret manually.", 3500, "info");
                  return;
                }
                navigator.clipboard.writeText(secretDisclosure.value).then(
                  () => showSnackbar("Client secret copied to clipboard.", 2500, "success"),
                  (error) => {
                    console.error("Unable to copy client secret:", error);
                    showSnackbar("Copy failed. Select and copy manually.", 3500, "error");
                  }
                );
              }}
              startIcon={<ContentCopyRoundedIcon />}
            >
              Copy Secret
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 700 }}>Save Client Secret Immediately</AlertTitle>
          This secret is only shown once for <strong>{secretDisclosure.appName}</strong>. Store it securely server-side:
          <Typography
            component="code"
            sx={{
              display: "block",
              overflowWrap: "anywhere",
              mt: 1,
              p: 1.5,
              background: "rgba(0,0,0,0.06)",
              borderRadius: 1.5,
              fontFamily: "monospace",
              fontSize: "0.85rem",
            }}
          >
            {secretDisclosure.value}
          </Typography>
        </Alert>
      )}

      {/* Register New Application Form */}
      {showRegisterForm && (
        <Paper
          component="form"
          onSubmit={handleAdd}
          variant="outlined"
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: "1px solid #0076a8",
            boxShadow: "0 8px 24px rgba(0, 118, 168, 0.08)",
          }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom color="primary">
            Register New Application
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Fill in the app details below. Description accepts long text, pictures, and video links according to your app criteria.
          </Typography>

          <Stack spacing={2.5}>
            {/* Row 1: Name, Key, Client Type */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                required
                fullWidth
                label="App Name"
                placeholder="e.g. Flight Simulator"
                size="small"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                required
                fullWidth
                label="App Key (Public Client ID)"
                placeholder="e.g. flight-simulator"
                helperText="URL-safe slug; public identifier"
                size="small"
                value={key}
                onChange={(event) => setKey(event.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: { md: 240 } }}>
                <InputLabel id="reg-app-type-label">App Type</InputLabel>
                <Select
                  labelId="reg-app-type-label"
                  label="App Type"
                  value={clientType}
                  onChange={(event) => setClientType(event.target.value)}
                >
                  <MenuItem value="public">Browser App (PKCE, No Secret)</MenuItem>
                  <MenuItem value="confidential">Server App (Client Secret)</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Row 2: URLs */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                required
                fullWidth
                label="App Launch URL"
                type="url"
                placeholder="http://localhost:3001/app or https://app.example.com/*"
                helperText={
                  clientType === "public"
                    ? "Append /* wildcard to protect nested routes."
                    : "Target application URL."
                }
                size="small"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
              {clientType === "confidential" && (
                <TextField
                  required
                  fullWidth
                  label="SSO Callback URL"
                  type="url"
                  placeholder="https://app.example.com/api/auth/callback"
                  helperText="Backend authorization-code exchange endpoint"
                  size="small"
                  value={callbackUrl}
                  onChange={(event) => setCallbackUrl(event.target.value)}
                />
              )}
            </Stack>

            <Divider>
              <Chip size="small" label="Rich Media & Description (Optional)" />
            </Divider>

            {/* Row 3: Description */}
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={8}
              label="Application Description"
              placeholder="Enter long description, overview, features, usage instructions, or release notes…"
              helperText="Supports rich long text with paragraphs."
              size="small"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            {/* Row 4: Pictures & Videos & ZIP Download */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Picture / Banner Image URL"
                type="url"
                placeholder="https://example.com/banner.png"
                helperText="Displays application screenshot/picture banner"
                size="small"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                InputProps={{
                  startAdornment: <ImageRoundedIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                }}
              />
              <TextField
                fullWidth
                label="Video URL (YouTube, Vimeo, MP4)"
                type="url"
                placeholder="https://youtube.com/watch?v=... or MP4 URL"
                helperText="Displays video overview in the app detail modal"
                size="small"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
                InputProps={{
                  startAdornment: <VideocamRoundedIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                }}
              />
              <TextField
                fullWidth
                label="Download Package (ZIP) URL"
                type="url"
                placeholder="https://example.com/downloads/app.zip"
                helperText="Direct link for 'Download App (ZIP)' button"
                size="small"
                value={downloadUrl}
                onChange={(event) => setDownloadUrl(event.target.value)}
                InputProps={{
                  startAdornment: <FileDownloadRoundedIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                }}
              />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 1 }}>
              <Button variant="outlined" color="inherit" onClick={() => setShowRegisterForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={saving}>
                Save & Register App
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}

      {/* Registered Applications List */}
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Registered Applications ({apps.length})
        </Typography>

        {apps.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography color="text.secondary">
              No applications registered yet. Click <strong>Register New App</strong> above to add your first app.
            </Typography>
          </Paper>
        ) : (
          apps.map((app) => (
            <Card
              key={app.key}
              variant="outlined"
              sx={{
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                transition: "all 0.2s ease",
                backgroundColor: app.enabled ? "#ffffff" : "#f8fafc",
                "&:hover": {
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  borderColor: "#cbd5e1",
                },
              }}
            >
              <CardContent sx={{ pb: 1.5 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
                  {/* App Icon */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "15px",
                      background: getAppGradient(app.key || app.name),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      boxShadow: "0 4px 10px -1px rgba(0,0,0,0.15)",
                      flexShrink: 0,
                    }}
                  >
                    {getAppInitials(app.name)}
                  </Box>

                  {/* App Information */}
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ gap: 0.5, mb: 0.5 }}>
                      <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                        {app.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={app.enabled ? "Active" : "Disabled"}
                        color={app.enabled ? "success" : "default"}
                        sx={{ height: 20, fontSize: "0.7rem", fontWeight: 600 }}
                      />
                      <Chip
                        size="small"
                        variant="outlined"
                        label={app.clientType === "public" ? "Browser PKCE" : "Server Confidential"}
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                      <Chip
                        size="small"
                        icon={<VpnKeyRoundedIcon sx={{ "&&": { fontSize: 11 } }} />}
                        label={app.key}
                        sx={{ height: 20, fontSize: "0.7rem", fontFamily: "monospace" }}
                      />
                    </Stack>

                    {/* Media Badges */}
                    <Stack direction="row" spacing={1} sx={{ my: 0.75, flexWrap: "wrap", gap: 0.5 }}>
                      {app.imageUrl && (
                        <Chip
                          size="small"
                          icon={<ImageRoundedIcon sx={{ "&&": { fontSize: 12 } }} />}
                          label="Image Configured"
                          variant="outlined"
                          color="info"
                          sx={{ height: 20, fontSize: "0.68rem" }}
                        />
                      )}
                      {app.videoUrl && (
                        <Chip
                          size="small"
                          icon={<VideocamRoundedIcon sx={{ "&&": { fontSize: 12 } }} />}
                          label="Video Configured"
                          variant="outlined"
                          color="secondary"
                          sx={{ height: 20, fontSize: "0.68rem" }}
                        />
                      )}
                      {app.downloadUrl && (
                        <Chip
                          size="small"
                          icon={<FileDownloadRoundedIcon sx={{ "&&": { fontSize: 12 } }} />}
                          label="Custom ZIP Link"
                          variant="outlined"
                          color="success"
                          sx={{ height: 20, fontSize: "0.68rem" }}
                        />
                      )}
                    </Stack>

                    {/* Description preview */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.5,
                      }}
                    >
                      {app.description || "No description provided."}
                    </Typography>

                    {/* Target URL */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Launch URL:
                      </Typography>
                      <Typography
                        component="a"
                        href={app.launchUrl || app.url}
                        target="_blank"
                        rel="noreferrer"
                        variant="caption"
                        color="primary"
                        sx={{ fontFamily: "monospace", textDecoration: "underline" }}
                      >
                        {app.launchUrl || app.url}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>

              <Divider />

              {/* Card Actions */}
              <CardActions sx={{ px: 2, py: 1, justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                    Status:
                  </Typography>
                  <Switch
                    size="small"
                    checked={app.enabled}
                    onChange={() => handleToggle(app)}
                    color="success"
                    inputProps={{ "aria-label": "Toggle app status" }}
                  />
                  <Typography variant="caption" fontWeight={600} color={app.enabled ? "success.main" : "text.secondary"}>
                    {app.enabled ? "Active" : "Disabled"}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditRoundedIcon />}
                    onClick={() => handleOpenEdit(app)}
                    sx={{ borderRadius: 2 }}
                  >
                    Edit App
                  </Button>

                  {app.clientType !== "public" && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRotateSecret(app)}
                      sx={{ borderRadius: 2 }}
                    >
                      Rotate Secret
                    </Button>
                  )}

                  <Button
                    component="a"
                    href={app.launchUrl || app.url}
                    target="_blank"
                    rel="noreferrer"
                    size="small"
                    endIcon={<OpenInNewRoundedIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Open
                  </Button>

                  <Tooltip title="Delete App & Revoke Role Grants">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(app)}
                      aria-label={`Delete ${app.name}`}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardActions>
            </Card>
          ))
        )}
      </Stack>

      {/* Edit App Dialog */}
      <Dialog
        open={Boolean(editingApp)}
        onClose={() => setEditingApp(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        {editingApp && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight={700}>
                Edit Application: {editingApp.name}
              </Typography>
              <IconButton onClick={() => setEditingApp(null)} size="small">
                <CloseRoundedIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ pt: 2 }}>
              <Stack spacing={2.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    required
                    fullWidth
                    label="App Name"
                    size="small"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="App Key"
                    size="small"
                    value={editingApp.key}
                    helperText="App key cannot be changed after creation."
                  />
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="App Launch URL"
                  type="url"
                  size="small"
                  value={editForm.url}
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                />

                {editingApp.clientType !== "public" && (
                  <TextField
                    required
                    fullWidth
                    label="SSO Callback URL"
                    type="url"
                    size="small"
                    value={editForm.callbackUrl}
                    onChange={(e) => setEditForm({ ...editForm, callbackUrl: e.target.value })}
                  />
                )}

                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={8}
                  label="Description (Rich long text, details, criteria)"
                  size="small"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />

                <TextField
                  fullWidth
                  label="Picture / Banner Image URL"
                  type="url"
                  size="small"
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  InputProps={{
                    startAdornment: <ImageRoundedIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="Video URL (YouTube, Vimeo, MP4)"
                  type="url"
                  size="small"
                  value={editForm.videoUrl}
                  onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })}
                  InputProps={{
                    startAdornment: <VideocamRoundedIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="Download Package (ZIP) URL"
                  type="url"
                  size="small"
                  value={editForm.downloadUrl}
                  onChange={(e) => setEditForm({ ...editForm, downloadUrl: e.target.value })}
                  InputProps={{
                    startAdornment: <FileDownloadRoundedIcon fontSize="small" sx={{ mr: 1, color: "action.active" }} />,
                  }}
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
              <Button onClick={() => setEditingApp(null)} color="inherit">
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AppManagement;
