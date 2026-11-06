import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import API from "../../../constants";
import UserTable from "./usertable";
import { useSnackbar } from "../../snackbar";

const UserManagement = () => {
  const [usersData, setUsersData] = React.useState([]);
  const [rolesList, setRolesList] = React.useState([]);
  const [roleMap, setRoleMap] = React.useState({});
  const [currentPermissions, setCurrentPermissions] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");
  const showSnackbar = useSnackbar();

  const editableFields = ["name", "email", "roleName", "status"];
  const columns = [
    { columnName: "name", type: "text", displayName: "Name" },
    { columnName: "email", type: "email", displayName: "Email" },
    {
      columnName: "roleName",
      type: "select",
      options: rolesList,
      displayName: "Role",
    },
    {
      columnName: "status",
      type: "select",
      options: ["Active", "Inactive"],
      displayName: "Status",
    },
    { columnName: "createdAt", type: "date", displayName: "Created At" },
  ];

  const getAllUsers = React.useCallback(async () => {
    const response = await fetch(
      `${API.DATA_URL}${API.DATA_ENDPOINTS.getAllUsers}`,
      {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch users.");
    }
    return data;
  }, []);

  const getAssignableRoles = React.useCallback(async () => {
    const response = await fetch(
      `${API.DATA_URL}${API.DATA_ENDPOINTS.getAssignableRoles}`,
      {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch roles.");
    }
    return data;
  }, []);

  const getCurrentPermissions = React.useCallback(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentPermissions(user?.roleId?.permissions || {});
    } catch (error) {
      console.error("Unable to read current user permissions:", error);
      showSnackbar("Unable to read current user permissions.", 3000, "error");
    }
  }, [showSnackbar]);

  const handleRefresh = React.useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    showSnackbar("Loading data", 3000, "info");
    try {
      const [usersResponse, rolesResponse] = await Promise.all([
        getAllUsers(),
        getAssignableRoles(),
      ]);
      setUsersData(
        (usersResponse.users || []).map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          roleName: user.roleId?.roleName || "",
          status: user.status,
          createdAt: user.createdAt,
          isProtectedAdmin: user.isProtectedAdmin,
        }))
      );

      const nextRoleMap = {};
      (rolesResponse.roles || []).forEach((role) => {
        nextRoleMap[role.roleName] = role._id;
      });
      setRoleMap(nextRoleMap);
      setRolesList(Object.keys(nextRoleMap));
      getCurrentPermissions();
    } catch (error) {
      console.error("Unable to load user management data:", error);
      const message = error.message || "Unable to load management data.";
      setLoadError(message);
      showSnackbar(message, 3000, "error");
    } finally {
      setIsLoading(false);
    }
  }, [getAllUsers, getAssignableRoles, getCurrentPermissions, showSnackbar]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  if (isLoading) {
    return (
      <Box className="workspace-loading" role="status">
        <CircularProgress size={28} />
        <Typography color="text.secondary">Loading workspace members…</Typography>
      </Box>
    );
  }

  if (loadError) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={handleRefresh}>
            Retry
          </Button>
        }
      >
        {loadError}
      </Alert>
    );
  }

  if (usersData.length === 0) {
    return <Alert severity="info">No workspace members found.</Alert>;
  }

  return (
    <UserTable
      editableFields={editableFields}
      columns={columns}
      rolesList={rolesList}
      data={usersData}
      roleMap={roleMap}
      currentPermissions={currentPermissions}
      handleRefresh={handleRefresh}
    />
  );
};

export default UserManagement;
