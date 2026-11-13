import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useSnackbar } from "../../snackbar";
import API from "../../../constants";

const UserRequests = () => {
  const showSnackbar = useSnackbar();

  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredRequests, setFilteredRequests] = useState({
    approved: [],
    declined: [],
    pending: [],
    all: [],
  });

  const getUserRequests = useCallback(async () => {
    try {
      showSnackbar("Fetching requests...", 3000, "info");
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.getAllRequests}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Handle session expiration
          showSnackbar("Session expired. Please log in again.", 3000, "error");
          setTimeout(() => {
            window.location.href = "/workspace/signin";
          }, 3000);
          return;
        }

        // Show error message for other cases
        showSnackbar(
          data.message || "Failed to fetch requests.",
          3000,
          "error"
        );
        console.error(data.message || "Error fetching requests.");
        return;
      }

      // Set requests in state
      showSnackbar("Requests fetched successfully.", 3000, "success");
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      showSnackbar(
        "An unexpected error occurred. Please try again.",
        3000,
        "error"
      );
    }
  }, [showSnackbar]);

  useEffect(() => {
    getUserRequests();
  }, [getUserRequests]);

  useEffect(() => {
    const approved = requests.filter(
      (request) => request.status === "Approved"
    );
    const declined = requests.filter(
      (request) => request.status === "Declined"
    );
    const pending = requests.filter((request) => request.status === "Pending");

    setFilteredRequests({
      approved,
      declined,
      pending,
      all: requests,
    });
  }, [requests]);

  const handleAction = (id, action) => {
    const status = action === "Approved" ? "Approved" : "Declined";

    fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.updateRequestStatus}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: id, status }),
    })
      .then(async (response) => {
        var data = await response.json();
        if (response.status === 200) {
          showSnackbar(data.message, 3000, "success");
          getUserRequests();
        } else {
          showSnackbar(data.message, 3000, "error");
        }
      })
      .catch((error) => {
        showSnackbar("Something went wrong", 3000, "error");
      });
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderTable = (data) => (
    <TableContainer component={Paper} elevation={0} className="sim-table-container">
      <Table
        sx={{
          width: "100%",
        }}
      >
        <TableHead className="sim-table-head">
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>
              Candidate Name
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>
              Identity Email
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>
              Request Status
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>
              Timestamp
            </TableCell>
            {activeTab === 1 && (
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Decision Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={activeTab === 1 ? 5 : 4} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary">
                  No access requests recorded in this queue category.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((request) => (
              <TableRow key={request._id} className="sim-table-row">
                <TableCell sx={{ fontWeight: 700, color: "#0f172a" }}>
                  {request.name}
                </TableCell>
                <TableCell className="sim-telemetry-chip" sx={{ color: "text.secondary" }}>
                  {request.email}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      request.status === "Approved"
                        ? "sim-badge-active"
                        : request.status === "Declined"
                        ? "sim-badge-inactive"
                        : "sim-telemetry-chip"
                    }
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: 600,
                      display: "inline-block",
                      backgroundColor:
                        request.status === "Pending" ? "rgba(245, 158, 11, 0.1)" : undefined,
                      color:
                        request.status === "Pending" ? "#b45309" : undefined,
                      border:
                        request.status === "Pending" ? "1px solid #fde68a" : undefined,
                    }}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell className="sim-telemetry-chip" sx={{ color: "text.secondary" }}>
                  {formatDate(request.createdAt)}
                </TableCell>
                {activeTab === 1 && (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleAction(request._id, "Approved")}
                      className="sim-btn-glow"
                      sx={{
                        marginRight: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      <PersonAddIcon sx={{ mr: 0.5, fontSize: 18 }} /> Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleAction(request._id, "Declined")}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      <PersonRemoveIcon sx={{ mr: 0.5, fontSize: 18 }} /> Decline
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container sx={{ padding: 0, minWidth: "96%", margin: 0 }}>
      {/* Tabs navigation with cyber styling */}
      <Box
        component={Paper}
        elevation={0}
        className="sim-matrix-panel"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1.5,
          marginBottom: 3,
          flexWrap: "wrap",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          TabIndicatorProps={{
            sx: {
              height: 3,
              borderRadius: "3px 3px 0 0",
              backgroundColor: ["#0076a8", "#d97706", "#10b981", "#ef4444"][activeTab],
            },
          }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              minHeight: 44,
              color: "#64748b",
              "&.Mui-selected": {
                color: ["#0076a8", "#d97706", "#10b981", "#ef4444"][activeTab],
                fontWeight: 700,
              },
            },
          }}
        >
          <Tab label={`All Requests (${requests.length})`} />
          <Tab label={`Pending (${filteredRequests.pending.length})`} />
          <Tab label={`Approved (${filteredRequests.approved.length})`} />
          <Tab label={`Declined (${filteredRequests.declined.length})`} />
        </Tabs>

        {/* Refresh Button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={getUserRequests}
          className="sim-btn-glow"
          sx={{
            minWidth: 42,
            px: 1.5,
            borderRadius: 2,
            borderColor: "rgba(0, 180, 216, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
          size="small"
        >
          <LoopIcon fontSize="small" />
        </Button>
      </Box>

      {/* Render the table based on active tab */}
      {activeTab === 0 && renderTable(filteredRequests.all)}
      {activeTab === 1 && renderTable(filteredRequests.pending)}
      {activeTab === 2 && renderTable(filteredRequests.approved)}
      {activeTab === 3 && renderTable(filteredRequests.declined)}
    </Container>
  );
};

export default UserRequests;
