import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import LoopIcon from "@mui/icons-material/Loop";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import API from "../../../constants";
import { useSnackbar } from "../../snackbar";
import { usePopper } from "../../poppercontext";

const ORG_GRADIENTS = [
  "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
  "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
  "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
  "linear-gradient(135deg, #e11d48 0%, #fb7185 100%)",
  "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
  "linear-gradient(135deg, #0284c7 0%, #22d3ee 100%)",
];

const getOrgGradient = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % ORG_GRADIENTS.length;
  return ORG_GRADIENTS[index];
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const UserTable = ({
  users: initialUsers = [],
  organizations: initialOrgs = [],
  data = [],
  rolesList = [],
  roleMap = {},
  currentUser,
  currentPermissions = {},
  handleRefresh,
}) => {
  // Normalize users and organizations from props
  const [users, setUsers] = useState(() => {
    if (initialUsers && initialUsers.length > 0) return initialUsers;
    return (data || []).filter((item) => !item.isOrgPlaceholder);
  });

  const [organizations, setOrganizations] = useState(() => {
    if (initialOrgs && initialOrgs.length > 0) return initialOrgs;
    const orgsFromData = [];
    (data || []).forEach((item) => {
      if (item.isOrgPlaceholder && item.organization) {
        orgsFromData.push({
          id: item.orgId || item.id,
          name: item.organization,
          createdAt: item.createdAt,
        });
      }
    });
    return orgsFromData;
  });

  useEffect(() => {
    if (Array.isArray(initialUsers)) {
      setUsers(initialUsers);
    } else if (Array.isArray(data)) {
      setUsers(data.filter((item) => !item.isOrgPlaceholder));
    }
  }, [initialUsers, data]);

  useEffect(() => {
    if (Array.isArray(initialOrgs)) {
      setOrganizations(initialOrgs);
    }
  }, [initialOrgs]);

  const [activeTab, setActiveTab] = useState("organizations"); // "organizations" | "allUsers"
  const [selectedOrg, setSelectedOrg] = useState(null); // active organization object or null
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Inline editing state for users
  const [editingRowId, setEditingRowId] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Dialog 1: Add Organization
  const [openAddOrgDialog, setOpenAddOrgDialog] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSubscriptionDate, setNewOrgSubscriptionDate] = useState("");
  const [isSubmittingOrg, setIsSubmittingOrg] = useState(false);

  // Dialog: Extend Organization Subscription
  const [openExtendOrgDialog, setOpenExtendOrgDialog] = useState(false);
  const [orgToExtend, setOrgToExtend] = useState(null);
  const [customOrgEndDate, setCustomOrgEndDate] = useState("");
  const [isSubmittingExtendOrg, setIsSubmittingExtendOrg] = useState(false);

  // Dialog 2: Add User to Organization
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [targetOrgForUser, setTargetOrgForUser] = useState("");
  const [addUserForm, setAddUserForm] = useState({
    name: "",
    email: "",
    roleName: "",
    status: "Active",
    password: "",
    subscriptionEndDate: "",
  });
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  const showSnackbar = useSnackbar();
  const { confirm } = usePopper();

  // Map users per organization
  const usersByOrg = useMemo(() => {
    const map = new Map();
    users.forEach((user) => {
      const orgName = (user.organization || "").trim();
      if (!map.has(orgName)) {
        map.set(orgName, []);
      }
      map.get(orgName).push(user);
    });
    return map;
  }, [users]);

  // Keep selectedOrg in sync with organizations list if updated
  useEffect(() => {
    if (selectedOrg) {
      const found = organizations.find(
        (o) => o.name.toLowerCase() === selectedOrg.name.toLowerCase()
      );
      if (found) {
        setSelectedOrg(found);
      }
    }
  }, [organizations, selectedOrg]);

  // Handler: Open Add User dialog for specific organization
  const handleOpenAddUser = (orgName) => {
    setTargetOrgForUser(orgName);
    setAddUserForm({
      name: "",
      email: "",
      roleName: rolesList[0] || "",
      status: "Active",
      password: "",
      subscriptionEndDate: "",
    });
    setOpenAddUserDialog(true);
  };

  // Handler: Submit Add Organization
  const handleSaveOrganization = async (e) => {
    if (e) e.preventDefault();
    const trimmed = newOrgName.trim();
    if (!trimmed) {
      showSnackbar("Please enter an organization name.", 3000, "error");
      return;
    }

    setIsSubmittingOrg(true);
    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.organizations}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmed,
            subscriptionEndDate: newOrgSubscriptionDate || undefined,
          }),
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        showSnackbar(
          resData.message || "Unable to create organization.",
          3000,
          "error"
        );
        return;
      }

      const created = {
        id: resData.organization._id,
        _id: resData.organization._id,
        name: resData.organization.name,
        subscriptionEndDate: resData.organization.subscriptionEndDate || null,
        isSubscriptionActive: Boolean(resData.organization.subscriptionEndDate),
        daysRemaining: 30,
        createdAt: resData.organization.createdAt,
      };

      setOrganizations((prev) => [...prev, created]);
      setOpenAddOrgDialog(false);
      setNewOrgName("");
      setNewOrgSubscriptionDate("");
      showSnackbar("Organization created successfully!", 3000, "success");

      // Automatically select the new organization so user can add members right away!
      setSelectedOrg(created);
      setActiveTab("organizations");

      if (handleRefresh) handleRefresh();
    } catch (err) {
      showSnackbar("Unable to create organization.", 3000, "error");
    } finally {
      setIsSubmittingOrg(false);
    }
  };

  // Handler: Update / Extend Organization Subscription
  const handleUpdateOrgSubscription = async (daysToAdd, customDate = null) => {
    if (!orgToExtend) return;
    const orgId = orgToExtend.id || orgToExtend._id;
    setIsSubmittingExtendOrg(true);
    try {
      const payload =
        typeof daysToAdd === "number"
          ? { daysToAdd }
          : { subscriptionEndDate: customDate };
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.organizations}/${orgId}/subscription`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        showSnackbar(
          resData.message || "Unable to update subscription.",
          3000,
          "error"
        );
        return;
      }

      showSnackbar(
        resData.message || "Organization subscription updated successfully!",
        3000,
        "success"
      );
      setOpenExtendOrgDialog(false);
      setOrgToExtend(null);
      setCustomOrgEndDate("");

      if (handleRefresh) {
        handleRefresh();
      } else if (resData.organization) {
        setOrganizations((prev) =>
          prev.map((o) =>
            o.id === orgId || o._id === orgId
              ? { ...o, ...resData.organization }
              : o
          )
        );
      }
    } catch {
      showSnackbar("Unable to update organization subscription.", 3000, "error");
    } finally {
      setIsSubmittingExtendOrg(false);
    }
  };

  // Handler: Delete Organization
  const handleDeleteOrganization = async (org, e) => {
    if (e) e.stopPropagation();
    const result = await confirm(
      `Are you sure you want to delete organization "${org.name}"? All assigned members will become unassigned.`
    );
    if (!result) return;

    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.organizations}/${org.id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (response.ok) {
        setOrganizations((prev) => prev.filter((o) => o.id !== org.id));
        setUsers((prev) =>
          prev.map((u) =>
            u.organization?.toLowerCase() === org.name.toLowerCase()
              ? { ...u, organization: "" }
              : u
          )
        );
        if (selectedOrg && selectedOrg.id === org.id) {
          setSelectedOrg(null);
        }
        showSnackbar("Organization deleted.", 3000, "success");
        if (handleRefresh) handleRefresh();
      } else {
        showSnackbar("Unable to delete organization.", 3000, "error");
      }
    } catch {
      showSnackbar("Unable to delete organization.", 3000, "error");
    }
  };

  // Handler: Submit Add User to Organization
  const handleSaveUserSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!targetOrgForUser) {
      showSnackbar("Target organization is missing.", 3000, "error");
      return;
    }

    if (!addUserForm.name.trim()) {
      showSnackbar("Please enter member name.", 3000, "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(addUserForm.email.trim())) {
      showSnackbar("Please enter a valid email address.", 3000, "error");
      return;
    }

    if (!addUserForm.password || addUserForm.password.length < 8) {
      showSnackbar("Password must be at least 8 characters.", 3000, "error");
      return;
    }

    if (!roleMap[addUserForm.roleName]) {
      showSnackbar("Please select a valid role.", 3000, "error");
      return;
    }

    setIsSubmittingUser(true);
    const body = {
      organization: targetOrgForUser,
      name: addUserForm.name.trim(),
      email: addUserForm.email.trim().toLowerCase(),
      roleId: roleMap[addUserForm.roleName],
      status: addUserForm.status,
      password: addUserForm.password,
      subscriptionEndDate: addUserForm.subscriptionEndDate || undefined,
    };

    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.addUser}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const resData = await response.json();
      if (!response.ok) {
        showSnackbar(resData.message || "Unable to create user.", 3000, "error");
        return;
      }

      const newUser = {
        id: resData.user.id,
        organization: targetOrgForUser,
        name: resData.user.name,
        email: resData.user.email,
        roleName: addUserForm.roleName,
        status: resData.user.status,
        subscriptionEndDate: resData.user.subscriptionEndDate,
        createdAt: resData.user.createdAt,
        isProtectedAdmin: false,
      };

      setUsers((prev) => [newUser, ...prev]);
      showSnackbar(
        `Added ${newUser.name} to ${targetOrgForUser}!`,
        3000,
        "success"
      );
      setOpenAddUserDialog(false);
      if (handleRefresh) handleRefresh();
    } catch {
      showSnackbar("Unable to add user.", 3000, "error");
    } finally {
      setIsSubmittingUser(false);
    }
  };

  // Handler: Edit User
  const handleEditClick = (user) => {
    setEditingRowId(user.id);
    setEditValues({
      name: user.name,
      email: user.email,
      roleName: user.roleName,
      status: user.status,
      organization: user.organization || "",
      subscriptionEndDate: user.subscriptionEndDate
        ? String(user.subscriptionEndDate).slice(0, 10)
        : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditValues({});
  };

  const handleSaveEdit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editValues.email || "")) {
      showSnackbar("Please enter a valid email.", 3000, "error");
      return;
    }

    const body = {
      organization: editValues.organization || "",
      name: editValues.name,
      email: editValues.email,
      roleId: roleMap[editValues.roleName],
      status: editValues.status,
      subscriptionEndDate: editValues.subscriptionEndDate || null,
    };

    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.editUserDetails}${editingRowId}/edit`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingRowId ? { ...u, ...editValues } : u))
        );
        showSnackbar("User updated successfully", 3000, "success");
        setEditingRowId(null);
        if (handleRefresh) handleRefresh();
      } else {
        showSnackbar("Unable to update user details.", 3000, "error");
      }
    } catch {
      showSnackbar("Unable to update user details.", 3000, "error");
    }
  };

  // Handler: Delete User
  const handleDeleteUser = async (user) => {
    const result = await confirm(
      `Are you sure you want to delete user "${user.name}"?`
    );
    if (!result) return;

    try {
      const response = await fetch(
        `${API.DATA_URL}${API.DATA_ENDPOINTS.deleteUser}${user.id}/delete`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        showSnackbar("User deleted successfully.", 3000, "success");
        if (handleRefresh) handleRefresh();
      } else {
        showSnackbar("Something went wrong while deleting user.", 3000, "error");
      }
    } catch {
      showSnackbar("Unable to delete user.", 3000, "error");
    }
  };

  // Sorting
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  // Filtered organizations
  const filteredOrganizations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return organizations;
    return organizations.filter((org) => {
      const matchesName = org.name.toLowerCase().includes(query);
      const members = usersByOrg.get(org.name.trim()) || [];
      const matchesMember = members.some(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query)
      );
      return matchesName || matchesMember;
    });
  }, [organizations, searchQuery, usersByOrg]);

  // Unassigned users (if any)
  const unassignedUsers = useMemo(() => {
    return users.filter((u) => !(u.organization && u.organization.trim()));
  }, [users]);

  // Users in currently selected organization
  const selectedOrgUsers = useMemo(() => {
    if (!selectedOrg) return [];
    const isUnassigned = selectedOrg.id === "__unassigned__";
    let list = isUnassigned
      ? unassignedUsers
      : usersByOrg.get(selectedOrg.name.trim()) || [];

    if (filterRole) {
      list = list.filter((u) => u.roleName === filterRole);
    }
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }

    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      list = [...list].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [
    selectedOrg,
    unassignedUsers,
    usersByOrg,
    filterRole,
    searchQuery,
    sortConfig,
  ]);

  // All users filtered
  const filteredAllUsers = useMemo(() => {
    let list = users;
    if (filterRole) {
      list = list.filter((u) => u.roleName === filterRole);
    }
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.organization && u.organization.toLowerCase().includes(query))
      );
    }
    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      list = [...list].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [users, filterRole, searchQuery, sortConfig]);

  return (
    <Container sx={{ minWidth: "96%", px: 0, py: 1 }}>
      {/* Top Header Card with Simulation Telemetry */}
      <Paper
        elevation={0}
        className="sim-matrix-panel"
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
              <span className="sim-live-beacon" />
              <Typography
                variant="caption"
                className="sim-telemetry-chip"
                sx={{ color: "#0076a8", fontWeight: 700 }}
              >
                SIMULATION CLUSTER CONTROL · NODE MESH ACTIVE
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight={800} color="#0f172a">
              Cluster & Identity Mesh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure organizations, distribute cluster memberships, and enforce zero-trust role clearance.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Tooltip title="Synchronize telemetry state">
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

            {currentPermissions?.create && (
              <Button
                variant="contained"
                startIcon={<BusinessIcon />}
                onClick={() => {
                  setNewOrgName("");
                  setOpenAddOrgDialog(true);
                }}
                className="sim-btn-glow"
                sx={{
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 2.5,
                  background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
                  boxShadow: "0 4px 16px rgba(0, 118, 168, 0.35)",
                  textTransform: "none",
                }}
              >
                Add Organization
              </Button>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(226, 232, 240, 0.8)" }} />

        {/* Navigation & Search Bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          spacing={2}
        >
          <ToggleButtonGroup
            value={activeTab}
            exclusive
            onChange={(_e, val) => {
              if (val) {
                setActiveTab(val);
                if (val === "allUsers") {
                  setSelectedOrg(null);
                }
              }
            }}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                px: 2,
                borderRadius: 2,
                border: "1px solid rgba(0, 180, 216, 0.25)",
                "&.Mui-selected": {
                  background: "linear-gradient(135deg, rgba(0, 118, 168, 0.15) 0%, rgba(0, 180, 216, 0.15) 100%)",
                  color: "#0076a8",
                  borderColor: "#0076a8",
                },
              },
            }}
          >
            <ToggleButton value="organizations">
              <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
              Organizations ({organizations.length})
            </ToggleButton>
            <ToggleButton value="allUsers">
              <GroupsIcon sx={{ mr: 1, fontSize: 18 }} />
              All Users ({users.length})
            </ToggleButton>
          </ToggleButtonGroup>

          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <TextField
              variant="outlined"
              size="small"
              placeholder={
                selectedOrg
                  ? `Search inside ${selectedOrg.name}…`
                  : activeTab === "organizations"
                  ? "Search organizations…"
                  : "Search all users…"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: "#0076a8" }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery("")}>
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                minWidth: { xs: "100%", sm: 260 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#ffffff",
                },
              }}
            />

            {(selectedOrg || activeTab === "allUsers") && (
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel id="role-filter-label">Filter Role</InputLabel>
                <Select
                  labelId="role-filter-label"
                  label="Filter Role"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  sx={{ borderRadius: 2, bgcolor: "#ffffff" }}
                >
                  <MenuItem value="">All Roles</MenuItem>
                  {rolesList.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* VIEW A: ORGANIZATIONS VIEW */}
      {activeTab === "organizations" && (
        <>
          {/* A1: Organizations Grid (When no organization is selected) */}
          {!selectedOrg && (
            <Box>
              <Grid container spacing={2.5}>
                {filteredOrganizations.map((org) => {
                  const orgMembers = usersByOrg.get(org.name.trim()) || [];
                  const memberCount = orgMembers.length;
                  const gradient = getOrgGradient(org.name);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={org.id}>
                      <Card
                        elevation={0}
                        className="sim-matrix-panel"
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          p: 0.5,
                        }}
                        onClick={() => setSelectedOrg(org)}
                      >
                        <CardContent sx={{ pb: 1.5 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            sx={{ mb: 1.5 }}
                          >
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Avatar
                                sx={{
                                  background: gradient,
                                  width: 48,
                                  height: 48,
                                  fontWeight: 800,
                                  fontSize: "1.1rem",
                                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                  border: "2px solid rgba(255, 255, 255, 0.9)",
                                }}
                              >
                                {org.name.charAt(0).toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="h6"
                                  fontWeight={700}
                                  sx={{
                                    fontSize: "1.08rem",
                                    color: "#0f172a",
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {org.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  className="sim-telemetry-chip"
                                  sx={{ color: "text.secondary" }}
                                >
                                  INITIALIZED {formatDate(org.createdAt)}
                                </Typography>
                              </Box>
                            </Stack>

                            {currentPermissions?.delete && (
                              <Tooltip title="Delete organization">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={(e) => handleDeleteOrganization(org, e)}
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 2,
                                    backgroundColor: "rgba(254, 242, 242, 0.7)",
                                    border: "1px solid rgba(254, 202, 202, 0.8)",
                                    color: "#dc2626",
                                    flexShrink: 0,
                                    ml: 1,
                                    "&:hover": {
                                      backgroundColor: "#fee2e2",
                                      borderColor: "#fca5a5",
                                    },
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: 17 }} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              mt: 2,
                              pt: 1.5,
                              borderTop: "1px dashed rgba(226, 232, 240, 0.9)",
                            }}
                          >
                            <Stack direction="row" spacing={1} alignItems="center">
                              <span className="sim-live-beacon" />
                              <Chip
                                size="small"
                                icon={<PersonIcon sx={{ fontSize: "14px !important" }} />}
                                label={
                                  memberCount === 0
                                    ? "0 Nodes"
                                    : `${memberCount} Node${memberCount > 1 ? "s" : ""}`
                                }
                                sx={{
                                  fontWeight: 600,
                                  backgroundColor:
                                    memberCount > 0 ? "rgba(240, 253, 244, 0.9)" : "rgba(248, 250, 252, 0.9)",
                                  color: memberCount > 0 ? "#166534" : "#64748b",
                                  border:
                                    memberCount > 0
                                      ? "1px solid #bbf7d0"
                                      : "1px solid #e2e8f0",
                                }}
                              />
                            </Stack>

                            {memberCount > 0 && (
                              <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: "0.75rem", border: "2px solid #fff", boxShadow: "0 2px 4px rgba(0,0,0,0.08)" } }}>
                                {orgMembers.map((m) => (
                                  <Tooltip key={m.id} title={`${m.name} (${m.roleName})`}>
                                    <Avatar sx={{ bgcolor: "#0076a8", fontWeight: 700 }}>
                                      {m.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                  </Tooltip>
                                ))}
                              </AvatarGroup>
                            )}
                          </Stack>

                          {/* Organization Subscription Status Row */}
                          <Box
                            sx={{
                              mt: 2,
                              pt: 1.5,
                              borderTop: "1px dashed rgba(226, 232, 240, 0.9)",
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography
                                  variant="caption"
                                  fontWeight={700}
                                  className="sim-telemetry-chip"
                                  sx={{
                                    color: "text.secondary",
                                    fontSize: "0.68rem",
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  SUBSCRIPTION:
                                </Typography>
                                {org.isSubscriptionActive ? (
                                  <Chip
                                    size="small"
                                    label={`Active (${org.daysRemaining}d)`}
                                    color="success"
                                    variant="outlined"
                                    sx={{
                                      height: 24,
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                      backgroundColor: "rgba(240, 253, 244, 0.9)",
                                      borderColor: "#86efac",
                                      color: "#166534",
                                    }}
                                  />
                                ) : (
                                  <Chip
                                    size="small"
                                    label="Expired / Inactive"
                                    color="error"
                                    variant="outlined"
                                    sx={{
                                      height: 24,
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                      backgroundColor: "rgba(254, 242, 242, 0.9)",
                                      borderColor: "#fca5a5",
                                      color: "#991b1b",
                                    }}
                                  />
                                )}
                              </Stack>

                              <Tooltip title="Extend or Renew Organization Subscription">
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color={org.isSubscriptionActive ? "primary" : "error"}
                                  startIcon={<LoopIcon sx={{ fontSize: "14px !important" }} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOrgToExtend(org);
                                    setOpenExtendOrgDialog(true);
                                  }}
                                  sx={{
                                    height: 28,
                                    borderRadius: 2,
                                    fontSize: "0.74rem",
                                    fontWeight: 700,
                                    textTransform: "none",
                                    px: 1.5,
                                    borderColor: org.isSubscriptionActive
                                      ? "rgba(0, 118, 168, 0.4)"
                                      : "rgba(239, 68, 68, 0.4)",
                                    "&:hover": {
                                      backgroundColor: org.isSubscriptionActive
                                        ? "rgba(0, 118, 168, 0.08)"
                                        : "rgba(239, 68, 68, 0.08)",
                                    },
                                  }}
                                >
                                  {org.isSubscriptionActive ? "Extend" : "Renew"}
                                </Button>
                              </Tooltip>
                            </Stack>
                          </Box>
                        </CardContent>

                        <CardActions
                          sx={{
                            px: 2,
                            pb: 2,
                            pt: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => setSelectedOrg(org)}
                            sx={{
                              flex: 1,
                              height: 36,
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: "0.82rem",
                              borderRadius: 2,
                              backgroundColor: "rgba(241, 245, 249, 0.95)",
                              color: "#0f172a",
                              boxShadow: "none",
                              border: "1px solid #e2e8f0",
                              "&:hover": {
                                backgroundColor: "#0076a8",
                                color: "#ffffff",
                                borderColor: "#0076a8",
                                boxShadow: "0 4px 12px rgba(0, 118, 168, 0.25)",
                              },
                            }}
                          >
                            Explore Cluster →
                          </Button>

                          {currentPermissions?.create && (
                            <Tooltip title={`Add user to ${org.name}`}>
                              <Button
                                variant="outlined"
                                size="small"
                                color="primary"
                                startIcon={
                                  <PersonAddIcon
                                    sx={{
                                      fontSize: "17px !important",
                                      display: "flex",
                                    }}
                                  />
                                }
                                onClick={() => handleOpenAddUser(org.name)}
                                sx={{
                                  height: 36,
                                  borderRadius: 2,
                                  textTransform: "none",
                                  fontWeight: 600,
                                  fontSize: "0.82rem",
                                  whiteSpace: "nowrap",
                                  px: 1.75,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderColor: "rgba(0, 118, 168, 0.4)",
                                  color: "#0076a8",
                                  "& .MuiButton-startIcon": {
                                    mr: 0.75,
                                    ml: 0,
                                    display: "flex",
                                    alignItems: "center",
                                  },
                                  "&:hover": {
                                    borderColor: "#0076a8",
                                    backgroundColor: "rgba(0, 118, 168, 0.08)",
                                  },
                                }}
                              >
                                Add User
                              </Button>
                            </Tooltip>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}

                {/* Unassigned Users Card (If any exist) */}
                {unassignedUsers.length > 0 && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                        border: "1px dashed #cbd5e1",
                        background: "#f8fafc",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "#64748b",
                          transform: "translateY(-2px)",
                        },
                      }}
                      onClick={() =>
                        setSelectedOrg({
                          id: "__unassigned__",
                          name: "Unassigned Users",
                          createdAt: null,
                        })
                      }
                    >
                      <CardContent>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                          <Avatar sx={{ bgcolor: "#94a3b8", width: 44, height: 44 }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={700} color="#334155">
                              Unassigned Users
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Users not assigned to any organization
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip
                          size="small"
                          icon={<PersonIcon sx={{ fontSize: "14px !important" }} />}
                          label={`${unassignedUsers.length} user${unassignedUsers.length > 1 ? "s" : ""}`}
                          sx={{
                            mt: 1.5,
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            height: 24,
                            backgroundColor: "rgba(241, 245, 249, 0.9)",
                            color: "#475569",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2, pt: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() =>
                            setSelectedOrg({
                              id: "__unassigned__",
                              name: "Unassigned Users",
                              createdAt: null,
                            })
                          }
                          sx={{
                            height: 36,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.82rem",
                            borderColor: "#cbd5e1",
                            color: "#475569",
                            "&:hover": {
                              borderColor: "#94a3b8",
                              backgroundColor: "rgba(241, 245, 249, 0.8)",
                            },
                          }}
                        >
                          View Unassigned Users →
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )}

                {/* Empty State: 0 organizations */}
                {filteredOrganizations.length === 0 && (
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 6,
                        textAlign: "center",
                        borderRadius: 3,
                        border: "1px dashed #cbd5e1",
                        background: "#f8fafc",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#e0f2fe",
                          color: "#0284c7",
                          width: 56,
                          height: 56,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <BusinessIcon fontSize="large" />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700} color="#1e293b" gutterBottom>
                        {searchQuery ? "No matching organizations found" : "No organizations yet"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 450, mx: "auto" }}>
                        {searchQuery
                          ? "Try a different search term to find organizations or members."
                          : "Create an organization to start assigning users, teams, and managing permissions."}
                      </Typography>

                      {currentPermissions?.create && (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddRoundedIcon />}
                          onClick={() => {
                            setNewOrgName("");
                            setOpenAddOrgDialog(true);
                          }}
                          sx={{ borderRadius: 2, fontWeight: 600 }}
                        >
                          Create First Organization
                        </Button>
                      )}
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}

          {/* A2: Organization Detail View (When an organization is clicked!) */}
          {selectedOrg && (
            <Box>
              {/* Back navigation & Organization Detail Banner */}
              <Paper
                elevation={0}
                className="sim-matrix-panel"
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  mb: 3,
                }}
              >
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  onClick={() => setSelectedOrg(null)}
                  sx={{
                    mb: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#0076a8",
                    "&:hover": { color: "#005a84", bgcolor: "rgba(0, 118, 168, 0.08)" },
                  }}
                >
                    Back to All Clusters
                </Button>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        background:
                          selectedOrg.id === "__unassigned__"
                            ? "#94a3b8"
                            : getOrgGradient(selectedOrg.name),
                        width: 58,
                        height: 58,
                        fontWeight: 800,
                        fontSize: "1.35rem",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        border: "3px solid #ffffff",
                      }}
                    >
                      {selectedOrg.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h5" fontWeight={800} color="#0f172a">
                          {selectedOrg.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={`${selectedOrgUsers.length} Member${selectedOrgUsers.length !== 1 ? "s" : ""}`}
                          className="sim-telemetry-chip"
                          sx={{
                            fontWeight: 700,
                            bgcolor: "rgba(0, 118, 168, 0.1)",
                            color: "#0076a8",
                            border: "1px solid rgba(0, 180, 216, 0.35)",
                          }}
                        />
                        {selectedOrg.id !== "__unassigned__" && (
                          <Chip
                            size="small"
                            label={
                              selectedOrg.isSubscriptionActive
                                ? `Active (${selectedOrg.daysRemaining}d left)`
                                : "Subscription Expired"
                            }
                            color={selectedOrg.isSubscriptionActive ? "success" : "error"}
                            variant="outlined"
                            sx={{
                              fontWeight: 700,
                              backgroundColor: selectedOrg.isSubscriptionActive
                                ? "rgba(240, 253, 244, 0.9)"
                                : "rgba(254, 242, 242, 0.9)",
                            }}
                          />
                        )}
                      </Stack>
                      {selectedOrg.createdAt && (
                        <Typography variant="caption" className="sim-telemetry-chip" sx={{ color: "text.secondary" }}>
                          CLUSTER INITIALIZED: {formatDate(selectedOrg.createdAt)} · ZERO-TRUST DOMAIN
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {/* Actions for this specific organization */}
                  <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                    {selectedOrg.id !== "__unassigned__" && (
                      <Button
                        variant="outlined"
                        color={selectedOrg.isSubscriptionActive ? "primary" : "error"}
                        startIcon={<LoopIcon sx={{ fontSize: "16px !important" }} />}
                        onClick={() => {
                          setOrgToExtend(selectedOrg);
                          setOpenExtendOrgDialog(true);
                        }}
                        sx={{
                          height: 36,
                          borderRadius: 2,
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          textTransform: "none",
                          px: 2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {selectedOrg.isSubscriptionActive ? "Extend Subscription" : "Renew Subscription"}
                      </Button>
                    )}
                    {selectedOrg.id !== "__unassigned__" && currentPermissions?.create && (
                      <Button
                        variant="contained"
                        startIcon={<PersonAddIcon sx={{ fontSize: "17px !important" }} />}
                        onClick={() => handleOpenAddUser(selectedOrg.name)}
                        className="sim-btn-glow"
                        sx={{
                          height: 36,
                          borderRadius: 2,
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          px: 2.25,
                          whiteSpace: "nowrap",
                          background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
                          boxShadow: "0 4px 16px rgba(0, 118, 168, 0.35)",
                          textTransform: "none",
                        }}
                      >
                        Add User to {selectedOrg.name}
                      </Button>
                    )}

                    {selectedOrg.id !== "__unassigned__" && currentPermissions?.delete && (
                      <Tooltip title="Delete organization">
                        <IconButton
                          color="error"
                          onClick={(e) => handleDeleteOrganization(selectedOrg, e)}
                          sx={{
                            width: 36,
                            height: 36,
                            border: "1px solid #fee2e2",
                            bgcolor: "#fff5f5",
                            borderRadius: 2,
                            "&:hover": { bgcolor: "#fee2e2" },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
              </Paper>

              {/* Members Table for this Organization */}
              <TableContainer
                component={Paper}
                elevation={0}
                className="sim-table-container"
              >
                <Table>
                  <TableHead className="sim-table-head">
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>
                        <TableSortLabel
                          active={sortConfig.key === "name"}
                          direction={sortConfig.key === "name" ? sortConfig.direction : "asc"}
                          onClick={() => handleSort("name")}
                        >
                          Node Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        <TableSortLabel
                          active={sortConfig.key === "email"}
                          direction={sortConfig.key === "email" ? sortConfig.direction : "asc"}
                          onClick={() => handleSort("email")}
                        >
                          Network Email
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Clearance Role
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Subscription
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Provisioned At
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrgUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                          <Avatar
                            sx={{
                              bgcolor: "#f0fdf4",
                              color: "#16a34a",
                              width: 50,
                              height: 50,
                              mx: "auto",
                              mb: 1.5,
                            }}
                          >
                            <PersonAddIcon fontSize="medium" />
                          </Avatar>
                          <Typography variant="subtitle1" fontWeight={700} color="#1e293b">
                            No nodes registered in {selectedOrg.name} yet
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                            Add user nodes to this organization cluster to grant them application access.
                          </Typography>
                          {currentPermissions?.create && selectedOrg.id !== "__unassigned__" && (
                            <Button
                              variant="contained"
                              startIcon={<PersonAddIcon />}
                              onClick={() => handleOpenAddUser(selectedOrg.name)}
                              className="sim-btn-glow"
                              sx={{
                                borderRadius: 2,
                                fontWeight: 700,
                                background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
                                textTransform: "none",
                              }}
                            >
                              Add First User to {selectedOrg.name}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedOrgUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className="sim-table-row"
                        >
                          {/* Name */}
                          <TableCell>
                            {editingRowId === user.id ? (
                              <TextField
                                size="small"
                                value={editValues.name || ""}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, name: e.target.value })
                                }
                              />
                            ) : (
                              <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar
                                  sx={{
                                    bgcolor: "#0076a8",
                                    width: 34,
                                    height: 34,
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    boxShadow: "0 2px 8px rgba(0, 118, 168, 0.2)",
                                  }}
                                >
                                  {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight={700} color="#0f172a">
                                    {user.name}
                                    {user.isProtectedAdmin && (
                                      <Chip
                                        size="small"
                                        label="Admin"
                                        className="sim-badge-admin"
                                        sx={{ ml: 1, height: 20 }}
                                      />
                                    )}
                                  </Typography>
                                </Box>
                              </Stack>
                            )}
                          </TableCell>

                          {/* Email */}
                          <TableCell>
                            {editingRowId === user.id ? (
                              <TextField
                                size="small"
                                value={editValues.email || ""}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, email: e.target.value })
                                }
                              />
                            ) : (
                              <Typography variant="body2" color="text.secondary" className="sim-telemetry-chip">
                                {user.email}
                              </Typography>
                            )}
                          </TableCell>

                          {/* Role */}
                          <TableCell>
                            {editingRowId === user.id ? (
                              <Select
                                size="small"
                                value={editValues.roleName || ""}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, roleName: e.target.value })
                                }
                                disabled={Boolean(user.isProtectedAdmin)}
                              >
                                {rolesList.map((r) => (
                                  <MenuItem key={r} value={r}>
                                    {r}
                                  </MenuItem>
                                ))}
                              </Select>
                            ) : (
                              <Chip
                                size="small"
                                label={user.roleName || "No Role"}
                                sx={{
                                  fontWeight: 700,
                                  backgroundColor: "rgba(0, 118, 168, 0.08)",
                                  color: "#006a97",
                                  border: "1px solid rgba(0, 180, 216, 0.2)",
                                }}
                              />
                            )}
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            {editingRowId === user.id ? (
                              <Select
                                size="small"
                                value={editValues.status || "Active"}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, status: e.target.value })
                                }
                              >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                              </Select>
                            ) : (
                              <Chip
                                size="small"
                                label={user.status}
                                className={user.status === "Active" ? "sim-badge-active" : "sim-badge-inactive"}
                              />
                            )}
                          </TableCell>

                          {/* Subscription Status (Inherited from Organization Cluster) */}
                          <TableCell>
                            {user.isProtectedAdmin ? (
                              <Chip
                                size="small"
                                label="Exempt (Admin)"
                                sx={{
                                  fontWeight: 700,
                                  backgroundColor: "#f1f5f9",
                                  color: "#475569",
                                  border: "1px solid #cbd5e1",
                                }}
                              />
                            ) : (() => {
                              const orgName = (user.organization || "").trim().toLowerCase();
                              const userOrg = organizations.find(
                                (o) => (o.name || "").trim().toLowerCase() === orgName
                              );
                              if (userOrg) {
                                const isPast = !userOrg.isSubscriptionActive;
                                const days = userOrg.daysRemaining || 0;
                                const endDate = userOrg.subscriptionEndDate
                                  ? new Date(userOrg.subscriptionEndDate)
                                  : null;
                                return (
                                  <Stack spacing={0.5} alignItems="flex-start">
                                    <Chip
                                      size="small"
                                      label={isPast ? "Org Expired" : `Org Active (${days}d)`}
                                      sx={{
                                        fontWeight: 700,
                                        backgroundColor: isPast ? "#fee2e2" : "#dcfce7",
                                        color: isPast ? "#991b1b" : "#166534",
                                        border: `1px solid ${isPast ? "#fca5a5" : "#86efac"}`,
                                      }}
                                    />
                                    {endDate && !isNaN(endDate.getTime()) && (
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: "0.72rem" }}
                                      >
                                        Until {endDate.toLocaleDateString()}
                                      </Typography>
                                    )}
                                  </Stack>
                                );
                              }
                              return (
                                <Chip
                                  size="small"
                                  label="No Org / Expired"
                                  sx={{
                                    fontWeight: 600,
                                    backgroundColor: "#fee2e2",
                                    color: "#991b1b",
                                    border: "1px solid #fca5a5",
                                  }}
                                />
                              );
                            })()}
                          </TableCell>

                          {/* Created At */}
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" className="sim-telemetry-chip">
                              {formatDate(user.createdAt)}
                            </Typography>
                          </TableCell>

                          {/* Actions */}
                          <TableCell align="right">
                            {editingRowId === user.id ? (
                              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                <IconButton size="small" color="primary" onClick={handleSaveEdit}>
                                  <SaveIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={handleCancelEdit}>
                                  <CancelIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            ) : (
                              <Stack direction="row" spacing={1} justifyContent="flex-end">
                                {currentPermissions?.edit && (
                                  <Tooltip title="Edit User">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEditClick(user)}
                                      disabled={Boolean(user.isProtectedAdmin)}
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 1.5,
                                        "&:hover": { color: "#0076a8", bgcolor: "rgba(0, 118, 168, 0.08)" },
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {currentPermissions?.delete && (
                                  <Tooltip title="Delete User">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleDeleteUser(user)}
                                      disabled={Boolean(
                                        user.isProtectedAdmin ||
                                          (currentUser && currentUser.id === user.id)
                                      )}
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 1.5,
                                        "&:hover": { bgcolor: "#fee2e2" },
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Stack>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      )}

      {/* VIEW B: ALL USERS TAB */}
      {activeTab === "allUsers" && (
        <TableContainer
          component={Paper}
          elevation={0}
          className="sim-table-container"
        >
          <Table>
            <TableHead className="sim-table-head">
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>
                  <TableSortLabel
                    active={sortConfig.key === "name"}
                    direction={sortConfig.key === "name" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Node Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  <TableSortLabel
                    active={sortConfig.key === "email"}
                    direction={sortConfig.key === "email" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("email")}
                  >
                    Network Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Cluster Domain
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Clearance Role
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Subscription
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Provisioned At
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      No nodes found matching your query filter.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAllUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="sim-table-row"
                  >
                    {/* Name */}
                    <TableCell>
                      {editingRowId === user.id ? (
                        <TextField
                          size="small"
                          value={editValues.name || ""}
                          onChange={(e) =>
                            setEditValues({ ...editValues, name: e.target.value })
                          }
                        />
                      ) : (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: "#0076a8",
                              width: 34,
                              height: 34,
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              boxShadow: "0 2px 8px rgba(0, 118, 168, 0.2)",
                            }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" fontWeight={700} color="#0f172a">
                            {user.name}
                            {user.isProtectedAdmin && (
                              <Chip
                                size="small"
                                label="Admin"
                                className="sim-badge-admin"
                                sx={{ ml: 1, height: 20 }}
                              />
                            )}
                          </Typography>
                        </Stack>
                      )}
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      {editingRowId === user.id ? (
                        <TextField
                          size="small"
                          value={editValues.email || ""}
                          onChange={(e) =>
                            setEditValues({ ...editValues, email: e.target.value })
                          }
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary" className="sim-telemetry-chip">
                          {user.email}
                        </Typography>
                      )}
                    </TableCell>

                    {/* Organization */}
                    <TableCell>
                      {editingRowId === user.id ? (
                        <Select
                          size="small"
                          value={editValues.organization || ""}
                          onChange={(e) =>
                            setEditValues({ ...editValues, organization: e.target.value })
                          }
                        >
                          <MenuItem value="">
                            <em>None (Unassigned)</em>
                          </MenuItem>
                          {organizations.map((o) => (
                            <MenuItem key={o.id} value={o.name}>
                              {o.name}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : user.organization ? (
                        <Tooltip title="Click to view organization cluster">
                          <Chip
                            size="small"
                            icon={<BusinessIcon sx={{ "&&": { fontSize: 13 } }} />}
                            label={user.organization}
                            onClick={() => {
                              const match = organizations.find(
                                (o) => o.name.toLowerCase() === user.organization.toLowerCase()
                              );
                              if (match) {
                                setSelectedOrg(match);
                                setActiveTab("organizations");
                              }
                            }}
                            sx={{
                              cursor: "pointer",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              background: "rgba(240, 253, 244, 0.9)",
                              color: "#166534",
                              border: "1px solid #bbf7d0",
                              "&:hover": {
                                bgcolor: "#bbf7d0",
                              },
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      {editingRowId === user.id ? (
                        <Select
                          size="small"
                          value={editValues.roleName || ""}
                          onChange={(e) =>
                            setEditValues({ ...editValues, roleName: e.target.value })
                          }
                          disabled={Boolean(user.isProtectedAdmin)}
                        >
                          {rolesList.map((r) => (
                            <MenuItem key={r} value={r}>
                              {r}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <Chip
                          size="small"
                          label={user.roleName || "No Role"}
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "rgba(0, 118, 168, 0.08)",
                            color: "#006a97",
                            border: "1px solid rgba(0, 180, 216, 0.2)",
                          }}
                        />
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {editingRowId === user.id ? (
                        <Select
                          size="small"
                          value={editValues.status || "Active"}
                          onChange={(e) =>
                            setEditValues({ ...editValues, status: e.target.value })
                          }
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      ) : (
                        <Chip
                          size="small"
                          label={user.status}
                          className={user.status === "Active" ? "sim-badge-active" : "sim-badge-inactive"}
                        />
                      )}
                    </TableCell>

                    {/* Subscription Status (Inherited from Organization Cluster) */}
                    <TableCell>
                      {user.isProtectedAdmin ? (
                        <Chip
                          size="small"
                          label="Exempt (Admin)"
                          sx={{
                            fontWeight: 700,
                            backgroundColor: "#f1f5f9",
                            color: "#475569",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      ) : (() => {
                        const orgName = (user.organization || "").trim().toLowerCase();
                        const userOrg = organizations.find(
                          (o) => (o.name || "").trim().toLowerCase() === orgName
                        );
                        if (userOrg) {
                          const isPast = !userOrg.isSubscriptionActive;
                          const days = userOrg.daysRemaining || 0;
                          const endDate = userOrg.subscriptionEndDate
                            ? new Date(userOrg.subscriptionEndDate)
                            : null;
                          return (
                            <Stack spacing={0.5} alignItems="flex-start">
                              <Chip
                                size="small"
                                label={isPast ? "Org Expired" : `Org Active (${days}d)`}
                                sx={{
                                  fontWeight: 700,
                                  backgroundColor: isPast ? "#fee2e2" : "#dcfce7",
                                  color: isPast ? "#991b1b" : "#166534",
                                  border: `1px solid ${isPast ? "#fca5a5" : "#86efac"}`,
                                }}
                              />
                              {endDate && !isNaN(endDate.getTime()) && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ fontSize: "0.72rem" }}
                                >
                                  Until {endDate.toLocaleDateString()}
                                </Typography>
                              )}
                            </Stack>
                          );
                        }
                        return (
                          <Chip
                            size="small"
                            label="No Org / Expired"
                            sx={{
                              fontWeight: 600,
                              backgroundColor: "#fee2e2",
                              color: "#991b1b",
                              border: "1px solid #fca5a5",
                            }}
                          />
                        );
                      })()}
                    </TableCell>

                    {/* Created At */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" className="sim-telemetry-chip">
                        {formatDate(user.createdAt)}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      {editingRowId === user.id ? (
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <IconButton size="small" color="primary" onClick={handleSaveEdit}>
                            <SaveIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={handleCancelEdit}>
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          {currentPermissions?.edit && (
                            <Tooltip title="Edit User">
                              <IconButton
                                size="small"
                                onClick={() => handleEditClick(user)}
                                disabled={Boolean(user.isProtectedAdmin)}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 1.5,
                                  "&:hover": { color: "#0076a8", bgcolor: "rgba(0, 118, 168, 0.08)" },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {currentPermissions?.delete && (
                            <Tooltip title="Delete User">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteUser(user)}
                                disabled={Boolean(
                                  user.isProtectedAdmin ||
                                    (currentUser && currentUser.id === user.id)
                                )}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 1.5,
                                  "&:hover": { bgcolor: "#fee2e2" },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* DIALOG 1: ADD ORGANIZATION (Only asks for Organization Name) */}
      <Dialog
        open={openAddOrgDialog}
        onClose={() => setOpenAddOrgDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          className: "sim-dialog-paper",
          sx: { p: 1 },
        }}
      >
        <DialogTitle sx={{ pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "#e0f2fe", color: "#0284c7", width: 40, height: 40 }}>
              <BusinessIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Deploy Cluster Domain
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Organization Mesh Entity
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={() => setOpenAddOrgDialog(false)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSaveOrganization}>
          <DialogContent sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Specify the organization identifier. Users can be provisioned into this cluster once deployed.
            </Typography>
            <TextField
              autoFocus
              fullWidth
              label="Organization Name"
              variant="outlined"
              size="small"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="e.g. Acme Corporation"
              required
            />
            <TextField
              fullWidth
              label="Subscription End Date (Optional)"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={newOrgSubscriptionDate}
              onChange={(e) => setNewOrgSubscriptionDate(e.target.value)}
              helperText="Optional: Set organization subscription expiry. Leave empty for no subscription."
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setOpenAddOrgDialog(false)}
              color="inherit"
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmittingOrg || !newOrgName.trim()}
              className="sim-btn-glow"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                px: 2.5,
                background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
              }}
            >
              {isSubmittingOrg ? "Deploying…" : "Deploy Organization"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG 2: ADD USER TO ORGANIZATION */}
      <Dialog
        open={openAddUserDialog}
        onClose={() => setOpenAddUserDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "sim-dialog-paper",
          sx: { p: 1 },
        }}
      >
        <DialogTitle sx={{ pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "#f0fdf4", color: "#16a34a", width: 40, height: 40 }}>
              <PersonAddIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                Provision Node to Cluster
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Assigned Cluster: <strong>{targetOrgForUser}</strong>
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={() => setOpenAddUserDialog(false)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSaveUserSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(240, 253, 244, 0.9)",
                  border: "1px solid #bbf7d0",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <BusinessIcon color="success" fontSize="small" />
                <Typography variant="body2" color="#166534" fontWeight={600} className="sim-telemetry-chip">
                  ASSIGNED CLUSTER: {targetOrgForUser}
                </Typography>
              </Box>

              <TextField
                autoFocus
                label="Full Name"
                variant="outlined"
                size="small"
                fullWidth
                value={addUserForm.name}
                onChange={(e) =>
                  setAddUserForm({ ...addUserForm, name: e.target.value })
                }
                required
              />

              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                value={addUserForm.email}
                onChange={(e) =>
                  setAddUserForm({ ...addUserForm, email: e.target.value })
                }
                required
              />

              <FormControl fullWidth size="small" required>
                <InputLabel id="role-select-label">Clearance Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  label="Clearance Role"
                  value={addUserForm.roleName}
                  onChange={(e) =>
                    setAddUserForm({ ...addUserForm, roleName: e.target.value })
                  }
                >
                  {rolesList.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  label="Status"
                  value={addUserForm.status}
                  onChange={(e) =>
                    setAddUserForm({ ...addUserForm, status: e.target.value })
                  }
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Initial Password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                helperText="Must be at least 8 characters"
                value={addUserForm.password}
                onChange={(e) =>
                  setAddUserForm({ ...addUserForm, password: e.target.value })
                }
                required
              />

              <TextField
                label="Subscription End Date"
                type="date"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                helperText="Optional override. Usually inherited directly from Organization cluster."
                value={addUserForm.subscriptionEndDate}
                onChange={(e) =>
                  setAddUserForm({
                    ...addUserForm,
                    subscriptionEndDate: e.target.value,
                  })
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setOpenAddUserDialog(false)}
              color="inherit"
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmittingUser}
              className="sim-btn-glow"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                px: 2.5,
                background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
              }}
            >
              {isSubmittingUser ? "Provisioning…" : `Provision to ${targetOrgForUser}`}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG 3: EXTEND / MANAGE ORGANIZATION SUBSCRIPTION */}
      <Dialog
        open={openExtendOrgDialog}
        onClose={() => {
          if (!isSubmittingExtendOrg) {
            setOpenExtendOrgDialog(false);
            setOrgToExtend(null);
          }
        }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          className: "sim-dialog-paper",
          sx: { p: 1 },
        }}
      >
        <DialogTitle sx={{ pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "#f0fdf4", color: "#16a34a", width: 40, height: 40 }}>
              <LoopIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                Organization Subscription
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Target: <strong>{orgToExtend?.name}</strong>
              </Typography>
            </Box>
          </Stack>
          <IconButton
            size="small"
            onClick={() => {
              setOpenExtendOrgDialog(false);
              setOrgToExtend(null);
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage the subscription period for <strong>{orgToExtend?.name}</strong>. All members in this cluster will instantly inherit this status.
          </Typography>

          <Box
            sx={{
              p: 1.5,
              mb: 2,
              borderRadius: 2,
              backgroundColor: orgToExtend?.isSubscriptionActive
                ? "rgba(240, 253, 244, 0.9)"
                : "rgba(254, 242, 242, 0.9)",
              border: `1px solid ${
                orgToExtend?.isSubscriptionActive ? "#bbf7d0" : "#fca5a5"
              }`,
            }}
          >
            <Typography variant="caption" display="block" color="text.secondary">
              CURRENT STATUS:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={700}
              color={orgToExtend?.isSubscriptionActive ? "#166534" : "#991b1b"}
            >
              {orgToExtend?.isSubscriptionActive
                ? `Active (${orgToExtend.daysRemaining} days remaining)`
                : "Expired / No Active Subscription"}
            </Typography>
            {orgToExtend?.subscriptionEndDate && (
              <Typography variant="caption" color="text.secondary">
                Valid until: {new Date(orgToExtend.subscriptionEndDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>

          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            Quick Extension:
          </Typography>
          <Grid container spacing={1} sx={{ mb: 2.5 }}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={isSubmittingExtendOrg}
                onClick={() => handleUpdateOrgSubscription(30)}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                +30 Days
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={isSubmittingExtendOrg}
                onClick={() => handleUpdateOrgSubscription(90)}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                +90 Days
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={isSubmittingExtendOrg}
                onClick={() => handleUpdateOrgSubscription(180)}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                +180 Days
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={isSubmittingExtendOrg}
                onClick={() => handleUpdateOrgSubscription(365)}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                +1 Year
              </Button>
            </Grid>
          </Grid>

          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            Or Set Custom Expiry Date:
          </Typography>
          <Stack spacing={1.5}>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={customOrgEndDate}
              onChange={(e) => setCustomOrgEndDate(e.target.value)}
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                fullWidth
                disabled={isSubmittingExtendOrg || !customOrgEndDate}
                onClick={() => handleUpdateOrgSubscription(null, customOrgEndDate)}
                sx={{
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #0076a8 0%, #00b4d8 100%)",
                }}
              >
                Save Custom Date
              </Button>
              <Button
                variant="outlined"
                color="error"
                disabled={isSubmittingExtendOrg}
                onClick={() => handleUpdateOrgSubscription(null, null)}
                sx={{ borderRadius: 2, textTransform: "none", whiteSpace: "nowrap" }}
              >
                Expire Now
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default UserTable;
