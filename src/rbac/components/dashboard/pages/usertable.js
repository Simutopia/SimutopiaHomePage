import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  TableSortLabel,
  InputAdornment,
  Typography,
  Button,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAdd from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import API from "../../../constants";
import { useSnackbar } from "../../snackbar";
import { usePopper } from "../../poppercontext";
import LoopIcon from "@mui/icons-material/Loop";


const UserTable = ({
  data,
  editableFields,
  columns,
  rolesList,
  roleMap,
  currentPermissions,
  handleRefresh,
}) => {
  const [users, setUsers] = useState(data);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [filterRole, setFilterRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const showSnackbar = useSnackbar();
  const { confirm } = usePopper();
  const [isAddingUser, setIsAddingUser] = React.useState(false);
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const handleAddUser = () => {
    setIsAddingUser(true);
    setEditValues({});
    setNewUserPassword("");
  };

  const handleSaveNewUser = async () => {
    const validationEmail = validateEmail(editValues.email);
    if (validationEmail) {
      showSnackbar(validationEmail, 3000, "error");
      return;
    }

    if (
      !editValues.name ||
      !editValues.email ||
      !editValues.roleName ||
      !editValues.status ||
      !newUserPassword
    ) {
      showSnackbar("Please fill in all fields", 3000, "error");
      return;
    }

    if (newUserPassword.length < 8) {
      showSnackbar("Password must be at least 8 characters long", 3000, "error");
      return;
    }

    const body = {
      name: editValues.name,
      email: editValues.email,
      roleId: roleMap[editValues.roleName],
      status: editValues.status,
      password: newUserPassword,
    };

    try {
      const response = await fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.addUser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        showSnackbar(data.message || "Unable to create user.", 3000, "error");
        return;
      }

      const createdUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        roleName: editValues.roleName,
        status: data.user.status,
        createdAt: data.user.createdAt,
        isProtectedAdmin: false,
      };
      setUsers((currentUsers) => [...currentUsers, createdUser]);
      showSnackbar(data.message, 3000, "success");
      setIsAddingUser(false);
      setEditValues({});
      setNewUserPassword("");
    } catch (error) {
      console.error("Unable to create user:", error);
      showSnackbar("Unable to create user. Please try again.", 3000, "error");
    }
  };

  const handleCancelNewUser = () => {
    setIsAddingUser(false);
    setEditValues({});
    setNewUserPassword("");
  };

  const handleEditClick = (id) => {
    setEditingRowId(id);
    const userToEdit = users.find((user) => user.id === id);
    setEditValues(userToEdit);
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditValues({});
  };

  const handleSaveEdit = () => {
    const emailError = validateEmail(editValues.email);
    if (emailError) {
      showSnackbar(emailError, 3000, "error");
      return;
    }
    var body = {
      name: editValues.name,
      email: editValues.email,
      roleId: roleMap[editValues.roleName],
      status: editValues.status,
    };
    fetch(
      `${API.DATA_URL}${API.DATA_ENDPOINTS.editUserDetails}${editingRowId}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      }
    ).then((response) => {
      if (response.status !== 200) {
        showSnackbar("Something went wrong", 3000, "error");
        return;
      } else {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingRowId ? { ...user, ...editValues } : user
          )
        );
        showSnackbar("User details updated successfully", 3000, "success");
      }
    });
    setEditingRowId(null);
    setEditValues({});
  };

  const handleDeleteClick = async (id) => {
    const result = await confirm("Are you sure you want to delete this user?");
    if (!result) return;
    fetch(`${API.DATA_URL}${API.DATA_ENDPOINTS.deleteUser}${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status !== 200) {
        showSnackbar("Something went wrong", 3000, "error");
      } else {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

        showSnackbar("User deleted successfully", 3000, "success");
      }
    });
  };

  const handleChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email) ? "" : "Please enter a valid email.";
  };
  const renderEditableField = (field, value) => {
    const { columnName, type, options } = field;

    switch (type) {
      case "text":
        return (
          <TextField
            value={value || ""}
            onChange={(e) => handleChange(columnName, e.target.value)}
            size="small"
          />
        );
      case "select":
        return (
          <Select
            value={value || ""}
            onChange={(e) => handleChange(columnName, e.target.value)}
            size="small"
            disabled={
              editingRowId === JSON.parse(localStorage?.getItem("user"))?.id
            }
          >
            {options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      case "email":
        return (
          <TextField
            value={value || ""}
            onChange={(e) => handleChange(columnName, e.target.value)}
            size="small"
          />
        );
      default:
        return value; // Default to plain text for unsupported types
    }
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole ? user.roleName === filterRole : true;
    const matchesSearch = user.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Container
      sx={{
        minWidth:"96%",
        padding:0,
        margin:0
      }}
    >
      <Paper
        sx={{
          p: 1,
          mb: 2,
          alignContent: "center",
          minWidth:"96%"
        }}
      >
        <Typography variant="h5" margin={2}>
          User Management
        </Typography>
        <Stack
          direction="row"
          alignItems={"center"}
          spacing={1}
          maxWidth={"100%"}
        >
          {currentPermissions?.create && (
            <Button variant="outlined" color="primary" onClick={handleAddUser}>
              <PersonAdd />
            </Button>
          )}
          <Button variant="outlined" color="primary" onClick={handleRefresh}>
            <LoopIcon />
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Roles</MenuItem>
            {rolesList.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table
          sx={{
            overflowX:"scroll"
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: "bold",
                },
                "& th:hover": {
                  cursor: "pointer",
                },
                "& th.Mui-active": {
                  color: "primary.main",
                },
                "& th.Mui-active:hover": {
                  color: "primary.main",
                },
              }}
            >
              {columns.map(({ columnName, displayName }) => (
                <TableCell key={columnName}>
                  <TableSortLabel
                    active={sortConfig.key === columnName}
                    direction={
                      sortConfig.key === columnName
                        ? sortConfig.direction
                        : "asc"
                    }
                    onClick={() => handleSort(columnName)}
                  >
                    {displayName}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Initial password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddingUser && (
              <TableRow>
                {columns.map(({ columnName, type, options }) => (
                  <TableCell key={columnName}>
                    {renderEditableField(
                      { columnName, type, options },
                      editValues[columnName] || ""
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <TextField
                    label="Initial password"
                    type="password"
                    autoComplete="new-password"
                    value={newUserPassword}
                    onChange={(event) => setNewUserPassword(event.target.value)}
                    size="small"
                    helperText="At least 8 characters"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleSaveNewUser}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelNewUser}>
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
            {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    {columns.map(({ columnName, type, options }) => (
                      <TableCell key={columnName}>
                        {editingRowId === user.id &&
                        editableFields.includes(columnName)
                          ? renderEditableField(
                              { columnName, type, options },
                              editValues[columnName]
                            )
                          : columnName === "createdAt"
                          ? formatDate(user[columnName]) // Format the createdAt field
                          : typeof user[columnName] === "object"
                          ? JSON.stringify(user[columnName])
                          : user[columnName] || ""}
                      </TableCell>
                    ))}
                    <TableCell>
                      {user.isProtectedAdmin ? "Protected account" : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        minWidth: "80px",
                      }}
                    >
                      {editingRowId === user.id ? (
                        <>
                          <IconButton onClick={handleSaveEdit}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          {currentPermissions?.edit && !user.isProtectedAdmin && (
                            <IconButton
                              onClick={() => handleEditClick(user.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          {currentPermissions?.delete && (
                            <IconButton
                              onClick={() => handleDeleteClick(user.id)}
                              disabled={Boolean(
                                user.isProtectedAdmin ||
                                  (localStorage.getItem("user") &&
                                    JSON.parse(localStorage.getItem("user"))
                                      ?.id === user?.id)
                              )}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
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

export default UserTable;
