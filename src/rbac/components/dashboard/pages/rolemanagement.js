import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Tooltip,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import LoopIcon from "@mui/icons-material/Loop";
import API from "../../../constants";
import { useSnackbar } from "../../snackbar";
import { usePopper } from "../../poppercontext";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

const canOpenApp = (grant) =>
  grant === true ||
  (grant && typeof grant === "object" && grant.access === true);

const RolePermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editedRole, setEditedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [apps, setApps] = useState([]);

  const showSnackbar = useSnackbar();
  const { confirm } = usePopper();

  // Handle entering edit mode
  const handleEdit = (role) => {
    setEditingRoleId(role.roleId);
    const permissions =
      role.permissions instanceof Map
        ? Object.fromEntries(role.permissions)
        : role.permissions || {};
    const storedAppPermissions =
      role.appPermissions instanceof Map
        ? Object.fromEntries(role.appPermissions)
        : role.appPermissions || {};
    setEditedRole({
      ...role,
      permissions: { ...permissions },
      appPermissions: Object.fromEntries(
        Object.entries(storedAppPermissions).map(([appKey, grant]) => [
          appKey,
          canOpenApp(grant),
        ])
      ),
    });
  };

  // Handle saving changes
  const handleSave = async () => {
    // Validate role name
    if (!editedRole?.roleName) {
      showSnackbar("Role name cannot be empty", 3000, "error");
      return;
    }
  
    // Prepare the request body
    const body = {
      roleName: editedRole?.roleName,
      permissions: editedRole.permissions,
      appPermissions: editedRole.appPermissions,
    };
  
    try {
      // API call to update role
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.editRole}${editingRoleId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        showSnackbar(data?.message || "Failed to update role", 3000, "error");
        return;
      }
  
      // Update roles state
      const savedRole = data.role;
      setRoles((currentRoles) =>
        currentRoles.map((role) =>
          role.roleId === editingRoleId
            ? {
                ...role,
                roleName: savedRole?.roleName || editedRole.roleName,
                permissions: savedRole?.permissions || editedRole.permissions,
                appPermissions:
                  savedRole?.appPermissions || editedRole.appPermissions,
              }
            : role
        )
      );
  
      // Reset editing state
      setEditingRoleId(null);
      setEditedRole(null);
  
      // Show success message
      showSnackbar(data?.message || "Role updated successfully", 3000, "success");
    } catch (error) {
      console.error("Error updating role:", error);
      showSnackbar("Failed to update role. Please try again.", 3000, "error");
    }
  };
  

  // Handle canceling edit
  const handleCancel = () => {
    setEditingRoleId(null);
    setEditedRole(null);
  };

  // Handle permission toggle during edit
  const handlePermissionChange = (permissionKey) => {
    setEditedRole({
      ...editedRole,
      permissions: {
        ...editedRole.permissions,
        [permissionKey]: editedRole.permissions[permissionKey] !== true,
      },
    });
  };

  const handleAppPermissionChange = (appKey) => {
    setEditedRole((current) => ({
      ...current,
      appPermissions: {
        ...current.appPermissions,
        [appKey]: current.appPermissions?.[appKey] !== true,
      },
    }));
  };

  // Handle role name change during edit
  const handleRoleNameChange = (e) => {
    setEditedRole({ ...editedRole, roleName: e.target.value });
  };

  // Add a new role
  const handleAddRole = async () => {
    // Validate input
    if (!newRoleName.trim()) {
      showSnackbar("Role name cannot be empty", 3000, "error");
      return;
    }
  
    // Prepare request body
    const body = {
      roleName: newRoleName.trim(),
      permissions: {},
      appPermissions: {},
    };
  
    try {
      // API request to add a new role
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.addRole}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        showSnackbar(data?.message || "Failed to add role", 3000, "error");
        console.error("Error adding role:", data);
        return;
      }
  
      // Update roles state with the new role
      const newRole = {
        roleId: data?.role?._id,
        roleName: data?.role?.roleName,
        isProtected: data?.role?.isProtected || false,
        permissions: data?.role?.permissions || {},
      };
      if (!newRole.roleId) {
        throw new Error("The server returned an invalid role response.");
      }
      setRoles([...roles, newRole]);
  
      // Reset form input
      setNewRoleName("");
  
      // Success message
      showSnackbar(data?.message || "Role added successfully", 3000, "success");
    } catch (error) {
      console.error("Unexpected error adding role:", error);
      showSnackbar("An unexpected error occurred. Please try again.", 3000, "error");
    }
  };
  

  //Delete role
  const handleDelete = async (role) => {
    // Validate roleId
    if (!role?.roleId) {
      showSnackbar("Invalid role. Unable to delete.", 3000, "error");
      return;
    }

    const result = await confirm("Are you sure you want to delete this role?");
    if (!result) return;
  
    try {
      // Optimistically remove role from the state
      const updatedRoles = roles.filter((delRole) => delRole.roleId !== role.roleId);
      setRoles(updatedRoles);
  
      // API request to delete role
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.deleteRole}${role.roleId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        // Revert roles state on failure
        setRoles(roles);
        const data = await response.json();
        showSnackbar(data?.message || "Failed to delete role", 3000, "error");
        console.error("Error deleting role:", data);
        return;
      }
  
      // Success message
      showSnackbar("Role deleted successfully", 3000, "success");
    } catch (error) {
      // Revert roles state on error
      setRoles(roles);
      console.error("Unexpected error deleting role:", error);
      showSnackbar("An unexpected error occurred. Please try again.", 3000, "error");
    }
  };
  
  // Get all roles
  const getAllRoles = useCallback(async () => {
    try {
      const [rolesResponse, appsResponse, permissionsResponse] = await Promise.all([
        fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.getAllRoles}`, {
          credentials: "include",
        }),
        fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.apps}`, {
          credentials: "include",
        }),
        fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.permissions}`, {
          credentials: "include",
        }),
      ]);
      const [rolesData, appsData, permissionsData] = await Promise.all([
        rolesResponse.json(),
        appsResponse.json(),
        permissionsResponse.json(),
      ]);
      if (!rolesResponse.ok) {
        throw new Error(rolesData.message || "Unable to fetch roles.");
      }
      if (!appsResponse.ok) {
        throw new Error(appsData.message || "Unable to fetch apps.");
      }
      if (!permissionsResponse.ok) {
        throw new Error(permissionsData.message || "Unable to fetch permissions.");
      }
      const permissions = Array.isArray(permissionsData)
        ? permissionsData
        : permissionsData.permissions || [];
      return {
        roles: rolesData.roles || [],
        apps: appsData.apps || [],
        permissions,
      };
    } catch (error) {
      console.error("Unable to fetch roles:", error);
      throw error;
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    showSnackbar("Loading data", 3000, "info");
    try {
      const data = await getAllRoles();
      const rolesList = data.roles.map((role) => ({
        roleId: role._id,
        roleName: role.roleName,
        isProtected: role.isProtected,
        permissions: role.permissions,
        appPermissions: Object.fromEntries(
          Object.entries(role.appPermissions || {}).map(([appKey, grant]) => [
            appKey,
            canOpenApp(grant),
          ])
        ),
      }));
      setRoles(rolesList);
      setApps(data.apps);
      setPermissionList(data.permissions);
      showSnackbar("Data loaded", 3000, "success");
    } catch (error) {
      let message = "Unable to load roles. Please check your connection or sign in again.";
      if (error && typeof error.message === "string" && !error.message.includes("fetch") && !error.message.includes("JSON")) {
        message = error.message;
      }
      showSnackbar(message, 3000, "error");
    }
  }, [getAllRoles, showSnackbar]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <Container sx={{ minWidth: "96%", px: 0, py: 1 }}>
      {/* Add New Role Section with Simulation Telemetry */}
      <Paper
        elevation={0}
        className="sim-matrix-panel"
        sx={{ p: { xs: 2.5, sm: 3 }, mb: 3 }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
              <span className="sim-live-beacon" />
              <Typography
                variant="caption"
                className="sim-telemetry-chip"
                sx={{ color: "#0076a8", fontWeight: 700 }}
              >
                ROLE MATRIX PROTOCOL · GRANULAR CAPABILITIES
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight={800} color="#0f172a">
              Role & Capability Matrix
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Provision zero-trust access profiles, fine-tune capabilities, and establish application entitlements.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <TextField
              label="New Role Identifier"
              variant="outlined"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              size="small"
              placeholder="e.g. SecurityAuditor"
              sx={{ minWidth: 220, bgcolor: "#fff", "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <Button
              variant="contained"
              onClick={handleAddRole}
              size="medium"
              className="sim-btn-glow"
              startIcon={<AddModeratorIcon />}
              sx={{
                background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                whiteSpace: "nowrap",
                px: 2,
              }}
            >
              Add Role
            </Button>
            <Tooltip title="Refresh roles and permissions">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleRefresh}
                className="sim-btn-glow"
                sx={{
                  minWidth: 42,
                  px: 1.5,
                  borderRadius: 2,
                  borderColor: "rgba(0, 180, 216, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <LoopIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Box>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "rgba(226, 232, 240, 0.8)" }} />

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Chip
            size="small"
            className="sim-telemetry-chip"
            label={`ROLES: ${roles.length}`}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.9)", border: "1px solid #cbd5e1" }}
          />
          <Chip
            size="small"
            className="sim-telemetry-chip"
            label={`CAPABILITIES: ${permissionList.length} ENFORCED`}
            sx={{ bgcolor: "rgba(240, 253, 244, 0.9)", color: "#166534", border: "1px solid #bbf7d0" }}
          />
          <Chip
            size="small"
            className="sim-telemetry-chip"
            label={`REGISTERED APPS: ${apps.length}`}
            sx={{ bgcolor: "rgba(238, 242, 255, 0.9)", color: "#4338ca", border: "1px solid #c7d2fe" }}
          />
        </Stack>
      </Paper>

      {/* Roles Table */}
      <TableContainer component={Paper} elevation={0} className="sim-table-container">
        <Table size="small" sx={{ borderCollapse: "collapse", minWidth: "98%" }}>
          <TableHead className="sim-table-head">
            <TableRow>
              <TableCell sx={{ padding: "12px 16px", fontWeight: "bold" }}>
                Role Identifier
              </TableCell>
              <TableCell sx={{ padding: "12px 16px", fontWeight: "bold" }}>
                Capabilities & App Access
              </TableCell>
              <TableCell
                sx={{ padding: "12px 16px", fontWeight: "bold" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.roleId} className="sim-table-row">
                {/* Role Name */}
                <TableCell
                  sx={{
                    padding: "12px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    verticalAlign: "top",
                  }}
                >
                  {editingRoleId === role.roleId ? (
                    <TextField
                      value={editedRole.roleName}
                      onChange={handleRoleNameChange}
                      size="small"
                      variant="outlined"
                      disabled={role.isProtected}
                      sx={{ fontSize: "0.75rem" }}
                    />
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" fontWeight={700} color="#0f172a">
                        {role.roleName}
                      </Typography>
                      {role.isProtected && (
                        <Chip
                          size="small"
                          label="SYSTEM PROTECTED"
                          className="sim-badge-admin"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Stack>
                  )}
                </TableCell>

                {/* Permissions */}
                <TableCell sx={{ padding: "12px 16px" }}>
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 1, mb: 1 }}>
                    {permissionList.map((permission) => (
                      <Box
                        key={permission.key}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: "4px 8px",
                          borderRadius: 1.5,
                          bgcolor: "rgba(248, 250, 252, 0.8)",
                          border: "1px solid rgba(226, 232, 240, 0.8)",
                        }}
                      >
                        <Typography variant="caption" fontWeight={600} color="#334155">
                          {permission.label}
                        </Typography>
                        {editingRoleId === role.roleId ? (
                          <Checkbox
                            checked={!!editedRole.permissions[permission.key]}
                            onChange={() =>
                              handlePermissionChange(permission.key)
                            }
                            size="small"
                            disabled={role.roleName.toLowerCase() === "admin"}
                            sx={{ "&.Mui-checked": { color: "#0076a8" } }}
                          />
                        ) : (
                          <Checkbox
                            checked={!!role.permissions[permission.key]}
                            disabled
                            size="small"
                            sx={{ "&.Mui-checked": { color: "#0076a8" } }}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
          {apps.length > 0 && (
            <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    App access
                  </Typography>
                  {apps.map((app) => (
                    <Box
                      key={app.key}
                      sx={{
                        mb: 1,
                        p: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" fontWeight={700}>
                        {app.name}
                      </Typography>
                      <FormControlLabel
                        label="Open app"
                        control={
                          <Checkbox
                            size="small"
                            checked={canOpenApp(
                              (editingRoleId === role.roleId
                                ? editedRole.appPermissions
                                : role.appPermissions)?.[app.key]
                            )}
                            disabled={editingRoleId !== role.roleId}
                            onChange={() =>
                              handleAppPermissionChange(app.key)
                            }
                          />
                        }
                      />
                    </Box>
                  ))}
            </>
          )}
                </TableCell>

                {/* Actions */}
                <TableCell
                  sx={{
                    padding: "4px 8px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                  align="center"
                >
                  {editingRoleId === role.roleId ? (
                    <>
                      <Tooltip title="Save">
                        <IconButton
                          color="primary"
                          onClick={handleSave}
                          size="small"
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          color="secondary"
                          onClick={handleCancel}
                          size="small"
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(role)}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={role?.isProtected ? "Protected role cannot be deleted" : "Delete"}>
                        <span>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(role)}
                            size="small"
                            disabled={
                              role?.isProtected
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RolePermissionManagement;
