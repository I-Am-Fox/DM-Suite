# DM Suite

DM Suite is a SaaS application for solo Dungeon Masters who want a focused campaign and session preparation workspace.

The product is intended to help a DM create a campaign, prepare sessions with connected campaign context, track the important people and places in the world, and eventually export their notes to Markdown or PDF.

## Planned Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Database: Neon Postgres
- Auth: Neon Auth
- Storage: S3-compatible storage, deferred
- Payments: Stripe
- Exports: Server-side Markdown and PDF generation
- Desktop later: Tauri wrapper around the web app

## MVP Focus

The first product milestone focuses on campaign and session prep for solo DMs.

- Personal account to campaigns ownership model
- Campaign dashboard
- Hybrid session prep workspace
- NPC, location, and faction tracker
- Campaign timeline and manual recap trail
- Export path planned from the start

## Current Scope Decisions

- Build for solo DMs first.
- Prioritize campaign and session prep.
- Use a subtle fantasy tabletop visual feel inside a clean SaaS interface.
- Use a personal account to campaigns tenancy model.
- Keep AI-assisted content generation out of scope for the MVP.
- Do not build player accounts, multiplayer collaboration, a VTT, mapmaking, marketplace, or public sharing in the MVP.

## Initial Architecture Notes

The front-end architecture and route plan are documented in [docs/front-end-architecture-plan.md](docs/front-end-architecture-plan.md).

## Implemented Front-End Scaffold

The current repo contains a Next.js App Router and Tailwind CSS scaffold for the MVP route plan.

- Public routes: `/`, `/login`, `/signup`, `/reset-password`
- Neon Auth routes: `/auth/[path]` and `/api/auth/[...path]`
- Authenticated routes: `/app`, `/app/onboarding`, `/app/account`
- Campaign routes: overview, sessions, session prep, world tracker, timeline, exports, and settings
- Auth: Neon Auth when `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` are configured; local mock auth remains available only outside production while credentials are missing
- Mock data boundary: `src/application/dm-suite/dm-suite-service.ts` exposes typed service methods backed by `src/infrastructure/mock` fixtures
- Project structure: see [docs/project-structure.md](docs/project-structure.md)
- Auth setup: see [docs/neon-auth.md](docs/neon-auth.md)

The session prep workspace supports populated, loading, error, and empty states. You can preview the non-default states with:

- `/app/campaigns/cmp-emberfall/sessions/ses-ash-road?state=loading`
- `/app/campaigns/cmp-emberfall/sessions/ses-ash-road?state=error`
- `/app/campaigns/cmp-emberfall/sessions/ses-ash-road?state=empty`

## Local Development

Install dependencies with your package manager, then run the development server:

```bash
npm install
npm run dev
```

The local `npm` installation must be functional for the checks to run:

```bash
npm run typecheck
npm run build
```
