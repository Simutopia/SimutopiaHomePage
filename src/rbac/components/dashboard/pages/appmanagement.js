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
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import API from "../../../constants";
import { useSnackbar } from "../../snackbar";

const request = async (path, options = {}) => {
  const response = await fetch(`${API.DATA_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
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
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [clientType, setClientType] = useState("public");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [callbackValues, setCallbackValues] = useState({});
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
      current === "" || current === name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        ? value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
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
      setUrl("");
      setCallbackUrl("");
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

  const handleToggle = async (app) => {
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(app.key)}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: app.name,
            description: app.description,
            url: app.url,
            ...(app.clientType !== "public"
              ? { callbackUrl: callbackValues[app.key] ?? app.callbackUrl }
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

  const handleSaveCallback = async (app) => {
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(app.key)}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: app.name,
            description: app.description,
            url: app.url,
            callbackUrl: callbackValues[app.key] ?? app.callbackUrl,
            enabled: app.enabled,
          }),
        }
      );
      setApps((current) =>
        current.map((item) => (item.key === app.key ? data.app : item))
      );
      showSnackbar("Callback URL saved.", 3000, "success");
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
    try {
      const data = await request(
        `${API.DATA_ENDPOINTS.apps}/${encodeURIComponent(app.key)}`,
        { method: "DELETE" }
      );
      setApps((current) => current.filter((item) => item.key !== app.key));
      showSnackbar(`${data.message}. Its role grants are no longer valid.`, 4000, "success");
    } catch (error) {
      showSnackbar(error.message, 3500, "error");
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Paper component="form" onSubmit={handleAdd} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Manage applications
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          Browser apps use PKCE and the App URL is also their SSO return URL.
          Server apps use a separate callback URL and require a trusted backend
          to keep the client secret.
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} useFlexGap flexWrap="wrap">
          <TextField
            required
            label="App name"
            size="small"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            required
            label="App key (public client ID)"
            helperText="Public identifier; not a secret"
            size="small"
            value={key}
            onChange={(event) => setKey(event.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: { md: 250 } }}>
            <InputLabel id="app-client-type-label">App type</InputLabel>
            <Select
              labelId="app-client-type-label"
              label="App type"
              value={clientType}
              onChange={(event) => setClientType(event.target.value)}
            >
              <MenuItem value="public">Browser app (PKCE, no secret)</MenuItem>
              <MenuItem value="confidential">Server app (client secret)</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            label="App URL"
            type="url"
            placeholder="https://app.example.com/app1 or /app1/*"
            helperText={
              clientType === "public"
                ? "Use a trailing /* to protect this route and its nested routes."
                : undefined
            }
            size="small"
            sx={{ minWidth: { md: 250 } }}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          {clientType === "confidential" && (
            <TextField
              required
              label="SSO callback URL"
              type="url"
              placeholder="https://app.example.com/auth/callback"
              size="small"
              sx={{ minWidth: { md: 320 } }}
              value={callbackUrl}
              onChange={(event) => setCallbackUrl(event.target.value)}
            />
          )}
          <TextField
            label="Description"
            size="small"
            sx={{ minWidth: { md: 220 }, flexGrow: 1 }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddRoundedIcon />}
            disabled={saving}
          >
            Add app
          </Button>
        </Stack>
      </Paper>

      {secretDisclosure && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
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
                  () => showSnackbar("Client secret copied.", 2500, "success"),
                  (error) => {
                    console.error("Unable to copy the client secret:", error);
                    showSnackbar("Copy failed. Select and copy the secret manually.", 3500, "error");
                  }
                );
              }}
            >
              Copy secret
            </Button>
          }
        >
          <AlertTitle>Save this client secret now</AlertTitle>
          It is shown only once for {secretDisclosure.appName}. Store it
          server-side; never put it in browser code or commit it.
          <Typography
            component="code"
            sx={{ display: "block", overflowWrap: "anywhere", mt: 1 }}
          >
            {secretDisclosure.value}
          </Typography>
        </Alert>
      )}

      <Stack spacing={1.5}>
        {apps.map((app) => (
          <Card key={app.key} variant="outlined">
            <CardContent sx={{ pb: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6">{app.name}</Typography>
                <Chip
                  size="small"
                  label={app.enabled ? "Enabled" : "Disabled"}
                  color={app.enabled ? "success" : "default"}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label={
                    app.clientType === "public"
                      ? "Browser app · PKCE"
                      : "Server app · secret"
                  }
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {app.description || app.key}
              </Typography>
              <Typography
                component="a"
                href={
                  app.clientType === "public"
                    ? app.url.replace(/\/\*$/, "")
                    : app.url
                }
                target="_blank"
                rel="noreferrer"
                variant="body2"
                sx={{ display: "inline-block", mt: 0.5 }}
              >
                {app.url}
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip size="small" variant="outlined" label={`App ID: ${app.key}`} />
              </Box>
              {app.clientType !== "public" && (
                <TextField
                  fullWidth
                  required
                  label="SSO callback URL"
                  type="url"
                  size="small"
                  sx={{ mt: 1.5 }}
                  value={callbackValues[app.key] ?? app.callbackUrl ?? ""}
                  onChange={(event) =>
                    setCallbackValues((current) => ({
                      ...current,
                      [app.key]: event.target.value,
                    }))
                  }
                />
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
              {app.clientType !== "public" && (
                <Button size="small" onClick={() => handleSaveCallback(app)}>
                  Save callback
                </Button>
              )}
              {app.clientType !== "public" && (
                <Button size="small" onClick={() => handleRotateSecret(app)}>
                  Rotate client secret
                </Button>
              )}
              <Button size="small" onClick={() => handleToggle(app)}>
                {app.enabled ? "Disable app" : "Enable app"}
              </Button>
              <Tooltip title="Delete app and revoke its role access">
                <IconButton
                  color="error"
                  aria-label={`Delete ${app.name}`}
                  onClick={() => handleDelete(app)}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        ))}
        {apps.length === 0 && (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography color="text.secondary">
              No apps registered yet. Add an app above to configure role access.
            </Typography>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default AppManagement;
