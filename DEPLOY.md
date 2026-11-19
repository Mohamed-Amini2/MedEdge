# MedEdge: running and deploying

One container serves everything: the Express API under `/api` and the built React app on every other path. One URL, no CORS, no second host.

## Demo account (created automatically on every start)

- email: `demo@mededge.app`
- password: `MedEdge2026`

Change with the `DEMO_EMAIL` and `DEMO_PASSWORD` environment variables.

## What to show for each sprint

| Sprint | Path |
|---|---|
| 1 | `/signup` (validation, then the 6-digit code page with the 60 s resend timer), `/login` |
| 2 | `/dashboard` (stats, vitals, chart), `/dashboard/appointments` (tabs, the 4-step booking wizard) |
| 3 | `/dashboard/messages`, `/dashboard/records`, `/dashboard/prescriptions`, `/dashboard/settings` |

Sign-up now really works: the account goes into PostgreSQL, the code is checked against a hash stored with a 10-minute expiry, and login opens a server session. The log-out button is at the bottom of the sidebar.

## Email codes

With no `RESEND_API_KEY` the app is in demo mode: the verify page shows the code on screen (click it to fill the box). With a Resend key the code is emailed instead; on the free `onboarding@resend.dev` sender Resend only delivers to the account owner's own address, so keep demo mode on unless you verify a domain. `DEMO_MODE=false` turns the on-screen code off.

## Run on this computer (no internet needed)

```powershell
C:\Users\USER\Documents\MedEdge\start-local.ps1
```

It starts the private PostgreSQL on port 54329, creates the database and tables, adds the demo account and serves everything on http://localhost:3000.

For development with hot reload: `bun src/server.ts` in `Back_End`, `npm run dev` in `Front_End`, open http://localhost:5173 (Vite proxies `/api` to port 3000).

## Deploy on Render (free)

1. Put the `MedEdge` folder in a GitHub repository (the folder that contains `Dockerfile` and `render.yaml` must be the repository root).
2. On render.com choose New, Blueprint, pick the repository. Render reads `render.yaml`, creates the free PostgreSQL database and the web service, and generates the three secrets itself.
3. Wait for the build (about 5 minutes). The link looks like `https://mededge.onrender.com`.
4. The free service goes to sleep after 15 minutes without visits and takes about a minute to wake up. Open the link a few minutes before the meeting, and again just before you share it.

Any other host that runs a Dockerfile works the same way. Needed variables: `DATABASE_URL` (PostgreSQL), `SESSION_SECRET`, `PEPPER_PASSWORD`, `OTP_SECRET`, `NODE_ENV=production`. `REDIS_URL` is optional: without it sessions live in memory and are lost on restart, so users simply log in again.

## Files that changed

- `Back_End/src/app.ts`, `server.ts`: JSON error handler, health check, serves the built frontend, Redis optional
- `Back_End/src/services/*`, `DAO/Email_Verification_DAO.ts`, `controllers/auth.controller.ts`, `routes/Auth_Routes.ts`: real one-time codes, sessions, `/api/auth/me`
- `Back_End/migrations/0005_verification_codes.sql`, `drizzle/schema.ts`: `verification_codes` table
- `Back_End/src/drizzle/seed.ts`: demo account
- `Front_End/src/lib/auth.ts`, the three auth pages, `Sidebar.tsx`, `Dashboard_Client.tsx`: relative API URL, demo code banner, log out, real user name
- `Front_End/vite.config.ts`: dev proxy
- `Dockerfile`, `.dockerignore`, `render.yaml`, `start-local.ps1`: deployment
