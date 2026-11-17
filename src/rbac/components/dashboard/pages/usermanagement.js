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
  const [usersList, setUsersList] = React.useState([]);
  const [organizationsList, setOrganizationsList] = React.useState([]);
  const [rolesList, setRolesList] = React.useState([]);
  const [roleMap, setRoleMap] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentPermissions, setCurrentPermissions] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");
  const showSnackbar = useSnackbar();

  const editableFields = ["organization", "name", "email", "roleName", "status"];
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
        credentials: "include",
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
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch roles.");
    }
    return data;
  }, []);

  const getCurrentUser = React.useCallback(async () => {
    const response = await fetch(
      `${API.DATA_URL}${API.DATA_ENDPOINTS.currentUser}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch current user.");
    }
    return data;
  }, []);

  const getOrganizations = React.useCallback(async () => {
    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.organizations}`,
        { credentials: "include" }
      );
      if (!response.ok) return { organizations: [] };
      return await response.json();
    } catch {
      return { organizations: [] };
    }
  }, []);

  const handleRefresh = React.useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    showSnackbar("Loading data", 3000, "info");
    try {
      const [usersResponse, rolesResponse, currentUserResponse, orgsResponse] =
        await Promise.all([
          getAllUsers(),
          getAssignableRoles(),
          getCurrentUser(),
          getOrganizations(),
        ]);

      const rawUsers = (usersResponse.users || []).map((user) => ({
        id: user.id || user._id,
        organization: user.organization || "",
        name: user.name,
        email: user.email,
        roleName: user.roleId?.roleName || "",
        status: user.status,
        createdAt: user.createdAt,
        isProtectedAdmin: user.isProtectedAdmin,
        subscriptionEndDate: user.subscriptionEndDate || null,
        subscription: user.subscription || null,
        isSubscriptionActive: user.isSubscriptionActive,
      }));

      const rawOrgs = (orgsResponse.organizations || []).map((org) => ({
        id: org._id || org.id,
        _id: org._id || org.id,
        name: org.name,
        subscriptionEndDate: org.subscriptionEndDate || null,
        isSubscriptionActive: Boolean(org.isSubscriptionActive),
        subscriptionStatus: org.subscriptionStatus || (org.isSubscriptionActive ? "active" : "expired"),
        daysRemaining: typeof org.daysRemaining === "number" ? org.daysRemaining : 0,
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
      }));

      setUsersList(rawUsers);
      setOrganizationsList(rawOrgs);

      const nextRoleMap = {};
      (rolesResponse.roles || []).forEach((role) => {
        nextRoleMap[role.roleName] = role._id;
      });
      setRoleMap(nextRoleMap);
      setRolesList(Object.keys(nextRoleMap));
      const current = currentUserResponse?.user;
      setCurrentUser(current);
      setCurrentPermissions(current?.roleId?.permissions || {});
    } catch (error) {
      console.error("Unable to load user management data:", error);
      let message = "Unable to load workspace members. Please verify your connection or sign in again.";
      if (error && typeof error.message === "string" && !error.message.includes("fetch") && !error.message.includes("JSON")) {
        message = error.message;
      }
      setLoadError(message);
      showSnackbar(message, 3000, "error");
    } finally {
      setIsLoading(false);
    }
  }, [getAllUsers, getAssignableRoles, getCurrentUser, getOrganizations, showSnackbar]);

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

  return (
    <UserTable
      editableFields={editableFields}
      columns={columns}
      rolesList={rolesList}
      users={usersList}
      organizations={organizationsList}
      roleMap={roleMap}
      currentUser={currentUser}
      currentPermissions={currentPermissions}
      handleRefresh={handleRefresh}
    />
  );
};

export default UserManagement;
