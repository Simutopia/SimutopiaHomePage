# Simutopia 2.0 Requirements

**Status:** Draft (planning only — no implementation started from this track)  
**Last updated:** 2026-11-11  
**Audience:** Future agents and developers working on the **public website** workstream

---

## Agent guidance (read first)

This repository hosts **two product surfaces** that share one React app:

| Surface | Route | Code | Owner / workstream |
| --- | --- | --- | --- |
| Public marketing / capability showcase | `/` | `src/App.js`, `src/components/*`, `src/global.css`, `public/*` | **This requirements track** |
| Authenticated workspace (login + apps) | `/workspace/*` | `src/rbac/**` | **Another developer — do not touch** |

### Hard rules for agents on this track

1. **Do not edit, refactor, move, or “improve” anything under `src/rbac/`.** That feature set (sign-in, session, dashboard, users/roles/apps/requests) is owned by another developer.
2. **Do not change workspace routing or RBAC integration** in ways that require editing `src/rbac/` internals. Mounting `RbacApp` at `/workspace/*` in `src/App.js` already exists; leave that boundary alone unless explicitly asked.
3. Prefer changes under `src/components/`, public assets, site theme/CSS, and copy/structure for the marketing homepage.
4. This document is the plan of record for the **showcase** workstream. Workspace AUTH/WS requirements below are **context only**, not tasks for this track.

---

## 1. Product vision

Simutopia 2.0 should do two things:

1. **Showcase / highlight Simutopia capabilities** — visitors understand what Simutopia does (simulation, analysis, digital twins, controls, industries served) and why it matters.
2. **Let users log in and use apps developed by Simutopia** — authenticated workspace where users open assigned Simutopia apps. **Implemented in `src/rbac/` by another developer; out of scope for this track.**

Both live in this repo; only (1) is in scope for agents following this document.

---

## 2. Goals (this track)

- [ ] Evolve from a single long scrolling page into a **multi-page** public website with top-nav links
- [ ] Make `/` a modern home that showcases use cases (media carousel) and explains Simutopia, then routes visitors deeper
- [ ] Give Industries, Services, About, Contact (and similar) their **own pages** with shareable URLs
- [ ] Keep a visible, non-breaking path into workspace sign-in (`/workspace/signin`) without owning workspace UX
- [ ] Keep the public site maintainable (content and layout updates without touching `src/rbac/`)

---

## 3. Scope

### In scope (public showcase workstream)

- **Multi-page public site** under `/` (React Router routes for home + secondary pages)
- Shared public site chrome: top navigation + footer (links to public pages; optional Workspace/Sign in)
- Home page layout described in §6 (carousel → about/why → deep links)
- Visual design, typography, motion, imagery, and short-video/use-case media for the marketing site
- Copy and information architecture that highlight Simutopia capabilities
- Responsive behavior for all public pages
- Docs under `documents/` related to this track

### Out of scope (explicit)

| Item | Why |
| --- | --- |
| **Entire `src/rbac/` tree** | Owned by another developer. Includes sign-in, session, dashboard, user/role/app/request management, workspace theme, RBAC constants and API calls from that folder. |
| Workspace product features | Login, app launch, permissions, admin flows — product goal #2, but **not** this workstream’s implementation. |
| Simutopia-CentralAuth backend | Separate repository; only interface awareness if linking into workspace. |
| MathWorks product tooling | Beyond existing marketing links/content on the site. |
| Engagement / contract types (T&M, Fixed Price, SOW models) | From the consulting overview PDF p.4 — keep off the public website. |

---

## 4. Current baseline (for orientation)

- **Stack:** Create React App, React, React Router, Material UI.
- **Today:** effectively a **single-page** public site — one route `/` with stacked sections (Header → BrandStatement → WhySim → Industries → Services → AboutUs → ContactSection → Footer).
- **Target:** multi-page public site; existing section content is raw material to redistribute across Home + dedicated pages.
- **Existing capability themes already reflected in content:** digital twin / multi-domain modeling, control systems, HIL, Monte Carlo / scenario studies, industries (heavy equipment, industrial automation, entertainment, robotics, medical devices, etc.).
- **Workspace:** Mounted at `/workspace/*` via `RbacApp`. Treat as a black box for this track. Do not collide public routes with `/workspace/*`.

---

## 5. Users and personas

| Persona | Primary need | Owned by |
| --- | --- | --- |
| Public visitor / prospect | Understand Simutopia capabilities; contact the team | **This track** |
| Returning customer / app user | Log in and use Simutopia apps | Other developer (`src/rbac/`) |
| Workspace admin | Manage users, roles, apps, requests | Other developer (`src/rbac/`) |

---

## 6. Agreed information architecture (this track)

**Decision:** Move off the single long page. Use a modern multi-page site with top-level navigation. Home introduces Simutopia and links out; detail lives on dedicated pages.

### 6.1 Proposed public routes (draft — names can be refined)

| Route | Purpose |
| --- | --- |
| `/` | Home — media showcase + what/why + links into the rest of the site |
| `/services` (or `/capabilities`) | Full services / capability detail (from today’s Services section) |
| `/industries` | Industry applications (from today’s Industries section) |
| `/about` | Team / company (from today’s AboutUs) |
| `/contact` | Contact form / details (from today’s ContactSection) |
| `/workspace/*` | **Not this track** — leave as-is for RBAC owner |

Top nav should link Home, Services, Industries, About, Contact (exact labels TBD), plus optional Workspace/Sign in.

### 6.2 Home page structure (agreed direction)

Top → bottom on `/`:

1. **Revolving / scrolling media strip (hero)**  
   - Auto-advancing carousel (or equivalent) of **use-case images and short videos**.  
   - Purpose: immediately show what Simutopia work looks like in context.  
   - Keep brand present (logo/name in chrome or overlaid carefully — avoid cluttered sticker overlays).  
   - Support pause/controls and reduced-motion preference where practical.

2. **What Simutopia is + Why simulation and analysis**  
   - Condensed brand/purpose statement.  
   - Carry forward the spirit of today’s WhySim content (why simulation/analysis; dynamic system behavior).  
   - One job: orientation — not the full services catalog.

3. **Explore / deep-link section**  
   - Cards or clear links into the dedicated pages (Services, Industries, About, Contact, etc.).  
   - This replaces stacking all former sections on one page.

Shared **Header (top nav) + Footer** wrap all public pages.

### 6.3 Why this makes sense

- Home stays scannable; detail pages stay focused (one primary job each).
- Use-case media at the top sells capability visually before long copy.
- Top-nav + home deep links make content discoverable and shareable (URLs for Services/Industries/About/Contact).
- Existing section components can be reused as page bodies rather than rewritten from scratch.

### 6.4 Design notes for the media hero

- Prefer real use-case visuals (industries, models, systems) over abstract-only decoration.
- Short videos: keep lightweight (compressed, muted autoplay only if allowed; always provide image fallback).
- Do not overload the first viewport with stats, schedules, or multiple competing text blocks — media + brand + short cue is enough; “what/why” follows below.
- Motion should feel intentional (carousel advance, subtle transitions), not noisy.

### 6.5 Integration boundary with workspace

- Public site may link to `/workspace` or `/workspace/signin`.
- Do not redesign workspace pages or auth flows as part of this track.
- If a shared header/theme conflict appears, resolve on the **public** side first; escalate before changing `src/rbac/`.

---

## 7. Functional requirements

### 7.1 Public website (this track — implement when approved)

| ID | Requirement | Priority |
| --- | --- | --- |
| PUB-01 | Public site is multi-page with top-level navigation to dedicated pages (not one endless scroll of all content) | Must |
| PUB-02 | Home `/` opens with a revolving/scrolling use-case media section (images and/or short videos) | Must |
| PUB-03 | Below the media section, Home explains what Simutopia is and why use simulation/analysis | Must |
| PUB-04 | Below that, Home provides clear links into the dedicated public pages | Must |
| PUB-05 | Services, Industries, About, and Contact (or equivalent) each have their own route and page | Must |
| PUB-06 | Provide contact path for prospects | Must |
| PUB-07 | Provide a discoverable path to workspace sign-in without owning workspace UX | Should |
| PUB-08 | Keep marketing content/layout maintainable without edits under `src/rbac/` | Must |
| PUB-09 | All public pages work on modern desktop and mobile browsers | Must |

### 7.2 Workspace / login / apps (other developer — context only)

> **Not tasks for this track.** Listed so agents understand the full product without implementing them.

| ID | Requirement | Priority | Owner |
| --- | --- | --- | --- |
| AUTH-01 | Email/password sign-in via Central Auth API | Must | `src/rbac/` owner |
| AUTH-02 | Session verify via `GET /api/users/me` | Must | `src/rbac/` owner |
| AUTH-03 | Sign-out clears local session + SSO cookie | Must | `src/rbac/` owner |
| AUTH-04 | Admin routes gated by permissions (e.g. `role_management`) | Must | `src/rbac/` owner |
| WS-01 | Role-appropriate workspace home | Must | `src/rbac/` owner |
| WS-02–WS-05 | Users, roles, apps (“my apps”), request management | Must/Should | `src/rbac/` owner |

---

## 8. Non-functional requirements

### This track (public site)

| ID | Requirement | Priority |
| --- | --- | --- |
| NFR-PUB-01 | Public pages usable on modern desktop and mobile browsers | Must |
| NFR-PUB-02 | Prefer accessible patterns consistent with existing MUI usage on the site | Should |
| NFR-PUB-03 | Avoid shipping secrets in frontend env; public site should not need private credentials | Must |

### Shared platform (context; mostly workspace/backend)

| ID | Requirement | Notes |
| --- | --- | --- |
| NFR-02–04 | `REACT_APP_*` public; CORS/cookie origin match; production `REACT_APP_API_URL` | Relevant if touching env/deploy docs; workspace auth ownership remains with other developer |

---

## 9. Dependencies and boundaries

- **This track depends on:** existing CRA app shell, MUI theme in `src/App.js`, assets in `public/images/`.
- **Workspace depends on:** [Simutopia-CentralAuth](https://github.com/Simutopia/Simutopia-CentralAuth) — not owned here.
- **Do not treat as implementation tasks here:** `src/rbac/constants.js` endpoints, PKCE/app registration flows, admin RBAC screens.

---

## 10. Content source: Consulting Services Overview PDF

**Source:** `Simutopia_Consulting_Services_Overview.pdf` (4 pages). Use this as the canonical marketing copy baseline; adapt for web (shorter headlines, scannable bullets, no brochure layout).

### 10.1 What the PDF contains

| PDF pages | Content |
| --- | --- |
| 1 | Company type (software & engineering consulting); mission; goal; belief in model-based design + “V” framework; four V benefits (risks early, requirements met, fewer prototypes, collaboration via models) |
| 2–3 | Industry proof: Heavy Equipment, Themed Entertainment, Industrial Automation, Hydrogen |
| 3 | Service catalog: Plant/Digital-Twin modeling, Control systems modeling, Motion control, Design & drawings, Training simulators, Real-time sim/testing (MIL/PIL/HIL), Application development, Human-flow / pedestrian simulations |
| 4 | Contract models (T&M, Fixed Price) — **not for the public website**; contact details (already on `/contact`) |

### 10.2 Where each piece belongs on the site

| Site page | Bring from the PDF | Notes |
| --- | --- | --- |
| **Home `/`** | Mission one-liner; V-framework benefits (already mirrored in WhySim) | Keep short. Do **not** dump full industry/service catalogs here. Carousel can use industry visuals (excavator, rides, automation, H2). |
| **Services `/services`** | Full service catalog from p.3 | Align/replace current Services list with PDF areas. Add missing ones: **Motion Control**, **Design & Drawings**, **Human Flow (Pedestrian) Simulations**. Keep tool names with proper trademarks/links. Do **not** include engagement/contract types. |
| **Industries `/industries`** | Industry sections from p.2–3 | Refresh bullets from PDF. Add **Hydrogen**. Decide whether to keep site-only industries (e.g. Robotics, Medical Devices) if still offered. Entertainment copy can deepen with Disney Imagineering lineage + MassMotion / FEA / animatronics. |
| **About `/about`** | Company definition + mission + MBD/V-framework belief from p.1 | Pair with existing team profiles. About = who we are + how we think; Services = what we sell. |
| **Contact `/contact`** | Contact block from p.4 | Already covered (globe + addresses + phones + email). |

### 10.3 Suggested content rules

1. **Home = orientation** (mission + why simulation). **Services/Industries = depth** from the PDF.
2. Prefer PDF wording for capability claims; trim for web scannability (title + 2–4 bullets per service/industry).
3. Do **not** put engagement or contract types (T&M, Fixed Price, SOW models) anywhere on the public website.
4. Trademark footnotes from p.4 can live as a small Services-page note, not in the hero.

### 10.4 Gap vs current site (to close when implementing content)

- **Add:** Hydrogen industry; Motion Control; Design & Drawings; Human Flow simulations; stronger V-framework story on About.
- **Reconcile:** Robotics / Medical Devices / Data Analysis on the current site vs PDF — keep only if still active offerings.
- **Upgrade:** Entertainment and Heavy Equipment bullets to PDF-level specificity (DEM soil loads, MassMotion, FEA, etc.) where approved for public use.

---

## 11. Open questions (showcase track)

- Exact top-nav labels and route paths (`/services` vs `/capabilities`, etc.)?
- Which use-case images/short videos go in the home carousel (sources, rights, count)?
- Autoplay interval / manual-only controls for the media strip?
- Should Industries be one page or one page per industry later?
- Keep Robotics / Medical Devices / Data Analysis if not in the PDF?
- Primary CTA on Home: Contact, Explore Services, or split with Workspace sign-in?
- Visual direction: keep current green/gray continuity vs. broader refresh?

---

## 12. Acceptance criteria (this track)

- [ ] Top nav reaches distinct public pages (Home, Services, Industries, About, Contact — or agreed equivalents)
- [ ] Home media section rotates/scrolls through use-case images and/or short videos
- [ ] Home still explains what Simutopia is and why simulation/analysis matter
- [ ] Home includes a section linking to the other public pages
- [ ] Former single-page section content is redistributed (not abandoned) onto the right pages
- [ ] Services and Industries reflect the Consulting Services Overview PDF (with agreed gaps resolved)
- [ ] Contact path works; Workspace entry exists if required
- [ ] Diff for this track contains **no** files under `src/rbac/`

---

## 13. Suggested implementation order (when work starts)

1. Lock route list + top-nav labels.
2. Introduce public page routes + shared Header/Footer layout (keep `/workspace/*` untouched).
3. Build Home: media carousel → what/why → explore links.
4. Move Services / Industries / About / Contact content onto their pages.
5. **Align copy with Consulting Services Overview PDF** (§10): Services catalog, Industries (incl. Hydrogen), About mission/V-framework.
6. Media polish (assets, video fallbacks, reduced motion, responsive).
7. Stop at the `/workspace` boundary — hand off login/apps issues to the RBAC owner.

---

## 14. Revision history

| Date | Author | Notes |
| --- | --- | --- |
| 2026-11-11 | — | Initial draft scaffold |
| 2026-11-11 | — | Refocused on public capability showcase; marked `src/rbac/` and login/apps as out of scope / other developer; added agent hard rules |
| 2026-11-11 | — | Agreed IA: multi-page site; Home = use-case media carousel → what/why → links to other pages |
| 2026-11-11 | — | First browser preview implemented with provisional routes `/`, `/services`, `/industries`, `/about`, `/contact` (names/routes still TBD for final) |
| 2026-11-14 | — | Mapped Consulting Services Overview PDF into Home / Services / Industries / About / Contact content plan |
| 2026-11-14 | — | Explicitly exclude engagement/contract types (T&M, Fixed Price) from the public website |
| 2026-11-14 | — | Website content updated from PDF: Services catalog, Industries (incl. Hydrogen), About mission/V-framework, Home carousel aligned; Robotics/Medical/Data Analysis removed from public pages |
