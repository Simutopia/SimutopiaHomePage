# SimutopiaHomePage Frontend Documentation

## 1️⃣ Project Structure (relevant to RBAC)
```
SimutopiaHomePage/
│   .env.example            # template for REACT_APP_API_URL, etc. (never committed)
│   package.json
│   package-lock.json
│   README.md
│
├─ public/
│   ├─ index.html
│   └─ … (favicon, manifest, robots.txt)
│
├─ src/
│   ├─ index.js            # React entry‑point, creates root and injects JWT into Axios
│   ├─ App.js              # Top‑level component, sets up routing
│   ├─ global.css
│   ├─ components/         # General UI widgets (Header, Footer, etc.)
│   └─ rbac/
│       ├─ constants.js    # Mirrors backend permission strings
│       ├─ App.css
│       ├─ RbacApp.js      # Wraps the RBAC SPA with <SnackbarProvider>
│       ├─ components/
│       │   ├─ snackbar.js # React Context + MUI Snackbar (toast) – provides `showSnackbar`
│       │   ├─ homepage.js
│       │   └─ dashboard/
│       │       └─ pages/
│       │           ├─ rolemanagement.js   # UI for listing/creating/editing/deleting roles
│       │           ├─ usermanagement.js   # UI for user CRUD & role assignment
│       │           ├─ appmanagement.js    # UI for managing apps (appPermissions)
│       │           ├─ requestmanagement.js
│       │           └─ … (home.js, myapps.js, …)
│       └─ … (other RBAC helpers)
│
└─ build/ (generated after `npm run build` – static assets served by CDN)
```

## 2️⃣ Core Files & What They Do
| File | Responsibility |
|------|-----------------|
| **src/index.js** | Bootstraps React and creates the root DOM node. API requests use `credentials: "include"` so the browser sends the HttpOnly `simutopia_sso` session cookie. |
| **src/App.js** | Defines the top‑level `<BrowserRouter>` and lazy‑loads the RBAC sub‑application (`<RbacApp/>`). Also sets up a fallback “Not Found” route. |
| **src/rbac/constants.js** | Exports a plain object/array of permission keys (`view_all_users`, `role_management`, …) so the UI never hard‑codes strings. |
| **src/rbac/components/snackbar.js** | Implements a React Context (`SnackbarContext`) and a `<SnackbarProvider>` that holds toast state (`open`, `message`, `autoHideDuration`, `color`). Exposes `showSnackbar(message, duration?, color?)` via `useSnackbar()`. Uses MUI `Snackbar` + `IconButton` + `CloseIcon`. |
| **src/rbac/components/dashboard/pages/rolemanagement.js** | UI page that:
- fetches the list of roles (`GET /api/roles/roleslist`).
- shows a table of roles with **Edit** / **Delete** buttons.
- opens a modal/form for **Create** / **Edit**; on submit it calls `POST /api/roles/define` or `PUT /api/roles/:id`.
- on success or failure it calls `useSnackbar()` to display a toast. |
| **src/rbac/components/dashboard/pages/usermanagement.js** | Similar pattern for users – lists users, assigns a role (dropdown populated from `/api/roles/assignable`), creates/deletes users. |
| **src/rbac/components/dashboard/pages/appmanagement.js** | Shows the list of applications (from `/api/apps`), lets an admin toggle `appPermissions` for a role. |
| **src/rbac/RbacApp.js** | Wraps the whole RBAC section with `<SnackbarProvider>`, provides a protected `<RequireAuth>` component that redirects to the sign‑in page if no JWT is present. |
| **src/rbac/components/dashboard/pages/...** | Each page follows the same *fetch‑then‑render‑then‑toast* pattern, keeping UI logic thin and delegating all business rules to the backend. |

## 3️⃣ Data Flow (Front‑end → Back‑end)
```mermaid
flowchart TD
    UI[User clicks “Create Role”] -->|useSnackbar()| Toast[Snackbar toast]
    UI -->|fetch('/api/roles/define')| BE[Express (roleRoutes)]
    BE -->|authMiddleware verifies JWT| Auth[req.user]
    Auth -->|controller validates payload| Ctrl[roleController.defineRole]
    Ctrl -->|MongoDB insert| DB[(MongoDB)]
    DB -->|new role doc| Ctrl
    Ctrl -->|res.json({role})| BE
    BE -->|JSON response| UI
    UI -->|on success -> useSnackbar('Created')| Toast
```
**Steps**
1. The page calls `fetch` (or Axios) with **Bearer JWT** automatically added by the global Axios interceptor.
2. The request hits **CORS** (already configured on the server) and then `authMiddleware`.
3. The controller validates the body (using the same permission set as the backend) and writes to the DB.
4. The backend returns the newly created role as JSON.
5. The React component updates its local state (e.g., adds the new role to the table) and **shows a toast** via `useSnackbar()`.

### Shared Concepts
- **Permissions list** lives in `constants/permissions.js` (backend) and `src/rbac/constants.js` (frontend) → both sides stay in sync.
- **JWT** is kept in the HttpOnly `simutopia_sso` cookie; frontend code does not read or store the token or user session in localStorage/sessionStorage. Current user data is fetched from `/api/users/me`.
- **Toast feedback** is completely client‑side; the server never knows about it.

## 4️⃣ Important Runtime Details
- **Build**: `npm run build` creates `build/` with static assets (`index.html`, hashed JS/CSS). Deploy this folder to a CDN (Netlify, Vercel, CloudFront). All network traffic must be served over **HTTPS**.
- **Environment variables**: Only variables prefixed with `REACT_APP_` are embedded at build time. `REACT_APP_API_URL` points to the backend (`https://api.simutopia.com`).
- **Content‑Security‑Policy**: When deployed, set CSP headers to only allow scripts/styles from `'self'` and any required CDN (e.g., MUI fonts). This prevents XSS injection.
- **Error handling**: Every fetch call catches errors and displays a toast (`useSnackbar(error.message, 8000, 'error')`). No raw stack traces are shown to the user.
- **Accessibility**: The Snackbar uses `role="alert"` via MUI, ensuring screen readers announce the message.
- **Testing**: Jest + React Testing Library tests exist for each page (e.g., `rolemanagement.test.js`). They mock the Axios calls and verify that a toast is shown on success/failure.

## 5️⃣ How to Extend
1. **Add a new RBAC page** – copy an existing page folder, import `useSnackbar`, `axios` (or the global instance), and create the appropriate backend route.
2. **New permission** – add the string to `constants/permissions.js` *and* to `src/rbac/constants.js`. Update any UI that shows/hides controls based on that permission.
3. **Change API URL** – modify `REACT_APP_API_URL` in the deployment environment; rebuild the app.

---
*This file lives at `SimutopiaHomePage/DOC_FRONTEND.md` and should be kept up‑to‑date whenever the folder structure or major UI flow changes.*