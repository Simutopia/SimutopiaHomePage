# Simutopia website

The React app serves the Simutopia marketing website at `/` and the protected
RBAC workspace under `/workspace`.
The original marketing layout remains the default; its navbar theme control
toggles the site-wide light/dark preference. The workspace uses Material UI
with a MATLAB-inspired blue, slate, and amber theme.

## Run locally

1. Install dependencies with `npm ci`.
2. Start the frontend with `npm start`.

The workspace uses `http://localhost:5000` for its API by default. Set
`REACT_APP_API_URL` before starting the app to use another backend URL.

## Workspace routes

- `/workspace` — workspace landing page.
- `/workspace/signin` — sign-in for authorized members.
- `/workspace/dashboard` — authenticated user dashboard.
- `/workspace/admin` — dashboard for administrators with role-management permission.

The API service lives in the `Simutopia-CentralAuth` project. Configure its
private `.env` file using `.env.example` before starting the backend.

## Sub-app access control

Administrators can register sub-apps from **Admin control center → App
management**. Each app has a stable public app key, app type, launch URL,
description, enabled state, and exact SSO callback URL. Choose **Browser app
(PKCE, no secret)** for a static SPA, or **Server app (client secret)** for an
app with a trusted backend; secrets are only generated for the latter. In
**Roles & permissions**, grant a role **Open app** access. Disabling an app
blocks SSO; deleting it removes its grants from every role. The built-in
admin role also needs an explicit app grant; its core role permissions remain
protected.

Sub-apps can list the signed-in user's enabled apps with
`GET /api/apps/accessible` and the workspace JWT. Browser apps use
authorization-code + PKCE: their React frontend requests a one-time code,
exchanges it for a short-lived app token, and validates that token with Central
Auth. No sub-app backend or client secret is required for this flow. Apps that
need protected data must still enforce authorization in their APIs. Existing
server apps can continue using the confidential-client server-side exchange.
See [Simutopia-CentralAuth README](../Simutopia-CentralAuth/README.md) for
protocol details and deployment requirements.
