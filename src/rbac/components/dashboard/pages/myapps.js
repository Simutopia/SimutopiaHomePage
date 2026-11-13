import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import API from "../../../constants";

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

// Pure JavaScript ZIP file generator (zero external dependencies)
const generateZipBlob = (files) => {
  const encodeText = (str) => new TextEncoder().encode(str);
  const fileRecords = [];
  let offset = 0;

  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[i] = c;
  }
  const crc32 = (bytes) => {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  };

  const parts = [];
  for (const file of files) {
    const nameBytes = encodeText(file.name);
    const dataBytes = encodeText(file.content);
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    const header = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    header.set(nameBytes, 30);

    fileRecords.push({ nameBytes, crc, size, offset });
    parts.push(header, dataBytes);
    offset += header.length + dataBytes.length;
  }

  const centralDirStart = offset;
  let centralDirSize = 0;

  for (const record of fileRecords) {
    const cdir = new Uint8Array(46 + record.nameBytes.length);
    const view = new DataView(cdir.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint16(14, 0, true);
    view.setUint32(16, record.crc, true);
    view.setUint32(20, record.size, true);
    view.setUint32(24, record.size, true);
    view.setUint16(28, record.nameBytes.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, record.offset, true);
    cdir.set(record.nameBytes, 46);

    parts.push(cdir);
    centralDirSize += cdir.length;
  }

  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true);
  eocdView.setUint16(6, 0, true);
  eocdView.setUint16(8, files.length, true);
  eocdView.setUint16(10, files.length, true);
  eocdView.setUint32(12, centralDirSize, true);
  eocdView.setUint32(16, centralDirStart, true);
  eocdView.setUint16(20, 0, true);
  parts.push(eocd);

  return new Blob(parts, { type: "application/zip" });
};

// Render video embed helper (YouTube, Vimeo, or direct MP4/video URL)
const renderVideoEmbed = (videoUrl) => {
  if (!videoUrl || typeof videoUrl !== "string") return null;
  const trimmed = videoUrl.trim();

  // YouTube match
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "56.25%",
          borderRadius: 2.5,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          backgroundColor: "#000",
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytMatch[1]}`}
          title="App Video Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </Box>
    );
  }

  // Vimeo match
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "56.25%",
          borderRadius: 2.5,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          backgroundColor: "#000",
        }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${vimeoMatch[3]}`}
          title="App Video Preview"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </Box>
    );
  }

  // Direct MP4 / WebM video file
  return (
    <Box
      component="video"
      controls
      src={trimmed}
      sx={{
        width: "100%",
        maxHeight: 340,
        borderRadius: 2.5,
        border: "1px solid #e2e8f0",
        backgroundColor: "#000",
      }}
    />
  );
};

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadApps = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API.DATA_URL}${API.DATA_ENDPOINTS.accessibleApps}`,
          {
            credentials: "include",
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
      } finally {
        setLoading(false);
      }
    };

    loadApps();
    return () => controller.abort();
  }, []);

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter(
      (app) =>
        (app.name && app.name.toLowerCase().includes(query)) ||
        (app.description && app.description.toLowerCase().includes(query)) ||
        (app.key && app.key.toLowerCase().includes(query))
    );
  }, [apps, searchQuery]);

  // Handle Download ZIP package
  const handleDownloadZip = (app) => {
    if (app.downloadUrl) {
      const link = document.createElement("a");
      link.href = app.downloadUrl;
      link.download = `${app.key || "application"}.zip`;
      link.target = "_blank";
      link.rel = "noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Generate client ZIP package dynamically
    const manifestJson = JSON.stringify(
      {
        name: app.name,
        key: app.key,
        clientType: app.clientType,
        url: app.url,
        launchUrl: app.launchUrl || app.url,
        description: app.description || "",
        exportedAt: new Date().toISOString(),
        system: "Simutopia Central Access",
      },
      null,
      2
    );

    const desktopShortcut = `[InternetShortcut]\nURL=${app.launchUrl || app.url}\nIconIndex=0\n`;
    const readmeTxt = `Simutopia Application Package\n============================\nApp Name: ${app.name}\nApp Key: ${app.key}\nAccess URL: ${app.launchUrl || app.url}\n\nDouble-click 'Launch-App.url' to open this application in your default browser.\n`;

    const zipBlob = generateZipBlob([
      { name: "manifest.json", content: manifestJson },
      { name: "Launch-App.url", content: desktopShortcut },
      { name: "README.txt", content: readmeTxt },
    ]);

    const blobUrl = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${app.key || "application"}-package.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          gap: 2,
        }}
      >
        <CircularProgress size={36} />
        <Typography color="text.secondary" variant="body2">
          Loading your accessible applications…
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (apps.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          background: "#fff",
          borderRadius: 3,
          border: "1px dashed #cbd5e1",
        }}
      >
        <AppsRoundedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          No Applications Assigned
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 460, mx: "auto" }}>
          Your role does not currently have access to any external or workspace apps. Contact an administrator to request app grants.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Search & Overview Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Accessible Applications ({filteredApps.length})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tap any app to view its media, full description, or launch it directly.
          </Typography>
        </Box>

        {apps.length > 3 && (
          <TextField
            size="small"
            placeholder="Search apps…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{ minWidth: { xs: "100%", sm: 260 } }}
          />
        )}
      </Stack>

      {/* Empty Search Results */}
      {filteredApps.length === 0 && (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography color="text.secondary" variant="body1">
            No applications match "{searchQuery}".
          </Typography>
          <Button
            size="small"
            onClick={() => setSearchQuery("")}
            sx={{ mt: 1 }}
          >
            Clear filter
          </Button>
        </Box>
      )}

      {/* Apps Launcher Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(130px, 1fr))",
            sm: "repeat(auto-fill, minmax(145px, 1fr))",
            md: "repeat(auto-fill, minmax(160px, 1fr))",
          },
          gap: { xs: 2, sm: 2.5 },
        }}
      >
        {filteredApps.map((app) => {
          const gradient = getAppGradient(app.key || app.name);
          const initials = getAppInitials(app.name);

          return (
            <Card
              key={app.key}
              variant="outlined"
              sx={{
                borderRadius: 3,
                transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px -3px rgba(0, 118, 168, 0.14)",
                  borderColor: "#0076a8",
                },
                "&:active": {
                  transform: "scale(0.97)",
                },
              }}
            >
              <CardActionArea
                onClick={() => setSelectedApp(app)}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                {/* App Icon */}
                <Box
                  sx={{
                    width: { xs: 58, sm: 66 },
                    height: { xs: 58, sm: 66 },
                    borderRadius: "18px",
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", sm: "1.45rem" },
                    letterSpacing: "0.03em",
                    boxShadow: "0 6px 14px -2px rgba(0,0,0,0.18)",
                    mb: 1.5,
                    userSelect: "none",
                  }}
                >
                  {initials}
                </Box>

                {/* App Name */}
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="text.primary"
                  sx={{
                    lineHeight: 1.3,
                    mb: 0.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {app.name}
                </Typography>

                {/* Badges / indicators */}
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                  {app.imageUrl && (
                    <Chip
                      size="small"
                      icon={<ImageIcon sx={{ "&&": { fontSize: 11 } }} />}
                      label="Photo"
                      sx={{ height: 18, fontSize: "0.65rem" }}
                    />
                  )}
                  {app.videoUrl && (
                    <Chip
                      size="small"
                      icon={<VideocamIcon sx={{ "&&": { fontSize: 11 } }} />}
                      label="Video"
                      sx={{ height: 18, fontSize: "0.65rem" }}
                    />
                  )}
                </Stack>

                {/* Client Type */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.72rem",
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {app.clientType === "public" ? "Browser App" : "SSO App"}
                </Typography>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>

      {/* App Detail Dialog */}
      <Dialog
        open={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: 3.5,
            p: 1,
            boxShadow: "0 20px 40px -10px rgba(0, 30, 50, 0.25)",
            maxHeight: "90vh",
          },
        }}
      >
        {selectedApp && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                pb: 1,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: "16px",
                    background: getAppGradient(selectedApp.key || selectedApp.name),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    boxShadow: "0 6px 14px -2px rgba(0,0,0,0.18)",
                    flexShrink: 0,
                  }}
                >
                  {getAppInitials(selectedApp.name)}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                    {selectedApp.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.5 }}>
                    <Chip
                      size="small"
                      label={selectedApp.clientType === "public" ? "Browser Web App" : "Confidential App"}
                      color={selectedApp.clientType === "public" ? "primary" : "secondary"}
                      variant="outlined"
                      sx={{ height: 22, fontSize: "0.72rem", fontWeight: 600 }}
                    />
                    <Chip
                      size="small"
                      icon={<VerifiedUserRoundedIcon sx={{ "&&": { fontSize: 13 } }} />}
                      label="Authorized"
                      color="success"
                      sx={{ height: 22, fontSize: "0.72rem", fontWeight: 600 }}
                    />
                  </Stack>
                </Box>
              </Stack>

              <IconButton
                onClick={() => setSelectedApp(null)}
                size="small"
                aria-label="Close dialog"
                sx={{ color: "text.secondary" }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
              <Stack spacing={2.5}>
                {/* Picture / Image Banner if available */}
                {selectedApp.imageUrl && (
                  <Box sx={{ width: "100%", overflow: "hidden", borderRadius: 2.5, border: "1px solid #e2e8f0" }}>
                    <Box
                      component="img"
                      src={selectedApp.imageUrl}
                      alt={selectedApp.name}
                      sx={{
                        width: "100%",
                        maxHeight: 340,
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </Box>
                )}

                {/* Video Embed if available */}
                {selectedApp.videoUrl && (
                  <Box>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="text.secondary"
                      sx={{ textTransform: "uppercase", letterSpacing: "0.06em", display: "block", mb: 0.75 }}
                    >
                      Application Video Overview
                    </Typography>
                    {renderVideoEmbed(selectedApp.videoUrl)}
                  </Box>
                )}

                {/* Description (supports long text & multiline) */}
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ textTransform: "uppercase", letterSpacing: "0.06em", display: "block", mb: 0.75 }}
                  >
                    About Application
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      lineHeight: 1.65,
                      background: "#f8fafc",
                      p: 2.5,
                      borderRadius: 2.5,
                      border: "1px solid #e2e8f0",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    {selectedApp.description || "No description provided for this application."}
                  </Typography>
                </Box>

                <Divider />

                {/* Details Meta */}
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <VpnKeyRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Application Key
                      </Typography>
                      <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                        {selectedApp.key}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <LinkRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    <Box sx={{ overflow: "hidden" }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Target Launch URL
                      </Typography>
                      <Typography
                        variant="body2"
                        fontFamily="monospace"
                        color="primary"
                        noWrap
                        sx={{ maxWidth: "420px" }}
                      >
                        {selectedApp.launchUrl || selectedApp.url}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </DialogContent>

            {/* Actions: Download App (ZIP) and Launch Application */}
            <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5, justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FileDownloadRoundedIcon />}
                onClick={() => handleDownloadZip(selectedApp)}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  fontWeight: 600,
                }}
              >
                Download App (ZIP)
              </Button>

              <Button
                component="a"
                href={selectedApp.launchUrl || selectedApp.url}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                color="primary"
                endIcon={<OpenInNewRoundedIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0, 118, 168, 0.25)",
                }}
              >
                Launch Application
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MyApps;
