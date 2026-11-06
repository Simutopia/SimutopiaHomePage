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
import AddModeratorIcon from "@mui/icons-material/AddModerator";

const permissionList = [
  {
    key: "create",
    label: "Create",
    description:
      "Allows creating new entities such as records, items, or users.",
  },
  {
    key: "edit",
    label: "Edit",
    description:
      "Allows editing existing entities such as records, items, or users.",
  },
  {
    key: "delete",
    label: "Delete",
    description: "Allows deleting entities such as records, items, or users.",
  },
  {
    key: "view_all_users",
    label: "View All Users",
    description: "Allows viewing details of all users in the system.",
  },
  {
    key: "view_personal_details",
    label: "View Personal Details",
    description: "Allows viewing personal details of individual users.",
  },
  {
    key: "approve_user_creation",
    label: "Approve User Creation",
    description: "Allows approving the creation of new users in the system.",
  },
  {
    key: "role_management",
    label: "Role Management",
    description:
      "Allows managing roles, including creating, editing, or deleting roles.",
  },
];

const canOpenApp = (grant) =>
  grant === true ||
  (grant && typeof grant === "object" && grant.access === true);

const RolePermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editedRole, setEditedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [apps, setApps] = useState([]);

  const showSnackbar = useSnackbar();

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
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
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
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
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
  
    try {
      // Optimistically remove role from the state
      const updatedRoles = roles.filter((delRole) => delRole.roleId !== role.roleId);
      setRoles(updatedRoles);
  
      // API request to delete role
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.deleteRole}${role.roleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
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
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      };
      const [rolesResponse, appsResponse] = await Promise.all([
        fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.getAllRoles}`, { headers }),
        fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.apps}`, { headers }),
      ]);
      const [rolesData, appsData] = await Promise.all([
        rolesResponse.json(),
        appsResponse.json(),
      ]);
      if (!rolesResponse.ok) {
        throw new Error(rolesData.message || "Unable to fetch roles.");
      }
      if (!appsResponse.ok) {
        throw new Error(appsData.message || "Unable to fetch apps.");
      }
      return { roles: rolesData.roles || [], apps: appsData.apps || [] };
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
      showSnackbar("Data loaded", 3000, "success");
    } catch (error) {
      showSnackbar(error.message || "Unable to load roles.", 3000, "error");
    }
  }, [getAllRoles, showSnackbar]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <Container>
      {/* Add New Role Section */}
      <Paper sx={{ p: 2, mb: 2, alignContent: "center" }}>
        <Typography variant="h5" gutterBottom>
          Role & Permission Management
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
          <TextField
            label="Role Name"
            variant="outlined"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            size="small"
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddRole}
            size="small"
            sx={{
              height: "2.5rem",
            }}
          >
            <AddModeratorIcon />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRefresh}
            size="small"
            sx={{
              height: "2.5rem",
            }}
          >
            <LoopIcon />
          </Button>
        </Box>
      </Paper>

      {/* Roles Table */}
      <TableContainer component={Paper}>
        <Table size="small" sx={{ borderCollapse: "collapse",minWidth:"98%",overflowX:"scroll" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>
                Role Name
              </TableCell>
              <TableCell sx={{ padding: "4px 8px", fontWeight: "bold" }}>
                Permissions
              </TableCell>
              <TableCell
                sx={{ padding: "4px 8px", fontWeight: "bold" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.roleId}>
                {/* Role Name */}
                <TableCell
                  sx={{
                    padding: "4px 8px",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                  }}
                >
                  {editingRoleId === role.roleId ? (
                    <TextField
                      value={editedRole.roleName}
                      onChange={handleRoleNameChange}
                      size="small"
                      variant="outlined"
                      disabled={
                        role.roleName === "guest" || role.roleName === "admin"
                      }
                      style={{ fontSize: "0.75rem" }}
                    />
                  ) : (
                    role.roleName
                  )}
                </TableCell>

                {/* Permissions */}
                <TableCell sx={{ padding: "4px 8px" }}>
                  {permissionList.map((permission) => (
                    <Box
                      key={permission.key}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: "2px",
                      }}
                    >
                      <Typography variant="caption">
                        {permission.label}
                      </Typography>
                      {editingRoleId === role.roleId ? (
                        <Checkbox
                          checked={!!editedRole.permissions[permission.key]}
                          onChange={() =>
                            handlePermissionChange(permission.key)
                          }
                          size="small"
                          disabled={role.roleName === "admin"}
                        />
                      ) : (
                        <Checkbox
                          checked={!!role.permissions[permission.key]}
                          disabled
                          size="small"
                        />
                      )}
                    </Box>
                  ))}
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
                      <Tooltip title="Delete">
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(role)}
                          size="small"
                          disabled={
                            role?.roleName === "admin" ||
                            role?.roleName === "guest"
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
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
