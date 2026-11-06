const API = {
  DATA_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  DATA_ENDPOINTS: {
    signin: "/api/users/login",
    currentUser: "/api/users/me",
    getAllRequests: "/api/user-requests/admin/requests",
    updateRequestStatus: "/api/user-requests/admin/update-status",
    getAssignableRoles: "/api/roles/assignable",
    editUserDetails: "/api/users/",
    getAllUsers: "/api/users/userslist",
    getAllRoles: "/api/roles/roleslist",
    apps: "/api/apps",
    accessibleApps: "/api/apps/accessible",
    deleteUser: "/api/users/",
    addUser: "/api/users/add",
    addRole: "/api/roles/define",
    deleteRole: "/api/roles/",
    editRole: "/api/roles/",
    editPassword: "/api/users",
  },
};

export default API;