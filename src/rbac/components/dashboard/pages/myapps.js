import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import API from "../../../constants";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const loadApps = async () => {
      try {
        const response = await fetch(
          `${API.DATA_URL}${API.DATA_ENDPOINTS.accessibleApps}`,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
            signal: controller.signal,
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to load your apps.");
        }
        setApps(data.apps || []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          console.error("Unable to load accessible apps:", loadError);
          setError(loadError.message || "Unable to load your apps.");
        }
      }
    };

    loadApps();
    return () => controller.abort();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (apps.length === 0) {
    return (
      <Alert severity="info">
        No apps have been assigned to your role yet. Contact an administrator.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {apps.map((app) => (
        <Card key={app.key} variant="outlined">
          <CardContent>
            <Typography variant="h6">{app.name}</Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
              {app.description || app.key}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Your role can open this app.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
            <Button
              component="a"
              href={
                app.clientType === "public"
                  ? app.url.replace(/\/\*$/, "")
                  : app.url
              }
              target="_blank"
              rel="noreferrer"
              endIcon={<OpenInNewRoundedIcon />}
            >
              Open app
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};

export default MyApps;
