# Simutopia website and workspace

This is the public Simutopia website and the React-based team workspace. The
backend API is in the [Simutopia-CentralAuth
repository](https://github.com/Simutopia/Simutopia-CentralAuth/tree/Dhanesh-devel).

## Run locally

Requirements: Node.js/npm and a running backend API. For a fresh local setup,
first configure and start the backend using the
[backend setup instructions](https://github.com/Simutopia/Simutopia-CentralAuth/blob/Dhanesh-devel/README.md#run-locally).
Then, in this project folder, run:

```powershell
npm ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm start
```

The development server serves `http://localhost:3000`. The sample
`REACT_APP_API_URL` points to the local API at `http://localhost:5000`. Edit
`.env.local` if the API runs at another origin, then restart the frontend.
The backend must allow the frontend's exact origin through its CORS
configuration.

## Frontend architecture

- **Tooling:** Create React App (`react-scripts`), JavaScript, React, and
  React Router.
- **UI:** Material UI components and theme providers, with project CSS for
  site-specific layout and styling.
- [`src/App.js`](./src/App.js) defines the public website at `/` and mounts the
  workspace at `/workspace/*`.
- `src/components/` contains the public site's page sections and layout.
- [`src/rbac/RbacApp.js`](./src/rbac/RbacApp.js) defines workspace routes,
  session verification, and the workspace theme.
- `src/rbac/components/dashboard/` contains the workspace layout and pages for
  overview, users, roles, app management, and assigned apps.
- [`src/rbac/constants.js`](./src/rbac/constants.js) holds the API origin and
  commonly used endpoint paths. Pages call the API with `fetch`.

The marketing site is public. Workspace routes verify the saved session with
`GET /api/users/me`; the admin route additionally requires the
`role_management` permission. Workspace content is shown according to the
signed-in user's role.

## Frontend-to-backend authentication

`REACT_APP_API_URL` is the backend origin and must not end with a slash. It is
read at build/start time by Create React App; changing a deployment's
environment requires rebuilding the frontend.

Sign-in sends email and password to `POST /api/users/login` with
`credentials: "include"`. On success, the API responds with a workspace JWT
and sets an HttpOnly SSO cookie. The frontend stores the workspace JWT and
user profile in browser local storage. Authenticated API calls send the token
as `x-auth-token`; the backend reloads the account and role before authorizing
each protected request. Signing out calls `POST /api/users/logout` to clear
the SSO cookie and then removes the local workspace session.

The shared workspace API origin and commonly used paths are defined in
`src/rbac/constants.js`. UI pages use browser `fetch` calls and handle HTTP
errors in their page state or notifications; they do not call MongoDB or
access backend models directly.

The API's `FRONTEND_URL` must match the browser's frontend origin (including
scheme and port), or the browser will block cross-origin API responses. The
SSO cookie is also used when the user opens a registered external app. See the
backend README for the browser PKCE and server-app flows.

Frontend environment variables are public: Create React App embeds
`REACT_APP_*` values into the downloaded JavaScript. Put no passwords, JWT
secrets, client secrets, or other credentials in this project’s environment.
For a production build, set `REACT_APP_API_URL` to the deployed Central Auth
API origin before running `npm run build`; the development sample URL is only
for local use.

## Routes

- `/` — public Simutopia website.
- `/workspace` — workspace landing page.
- `/workspace/signin` — sign-in.
- `/workspace/dashboard` — authenticated workspace.
- `/workspace/admin` — workspace for users with role-management permission.

## Commands

```powershell
npm start       # local development server
npm test        # Create React App tests (watch mode in an interactive terminal)
npm run build   # optimized static production build in build/
```

The configured GitHub Pages deployment command is `npm run deploy`; it builds
first and publishes `build/`. For another static host, publish the contents of
`build/` and configure SPA route fallback to `index.html`.

## Apps and permissions

Administrators register external apps from **App management** and assign
**Open app** access through **Roles & permissions**. The app key is a public
identifier. Use **Browser app (PKCE, no secret)** for a static SPA; use a
server app/client secret only when a trusted backend can keep the secret.
Never put a server client secret in frontend code. For details and endpoint
examples, see the
[Central Auth documentation](https://github.com/Simutopia/Simutopia-CentralAuth/blob/Dhanesh-devel/README.md).
