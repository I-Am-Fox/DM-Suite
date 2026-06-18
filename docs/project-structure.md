# DM Suite Project Structure

The app uses a layered Next.js structure. The goal is to make the codebase easy to scan while keeping the MVP deployable as one application.

## Layers

### `src/app`

Next.js App Router routes only. Route files should mostly parse route params, call a feature loader, and render UI. Avoid putting raw data access or tenant checks directly in page files.

### `src/domain`

Business vocabulary that is independent of Next.js and persistence.

- `dm-suite/types.ts` contains campaign, session, prep block, world, timeline, export, and user view models.
- `dm-suite/labels.ts` contains domain labels used by UI surfaces.

### `src/application`

Application service contracts and app-level orchestration.

- `auth/session.ts` reads the current server session and exposes `requireCurrentUser`.
- `auth/neon-auth.ts` owns Neon Auth server configuration.
- `auth/auth-client.ts` and `auth/auth-provider.tsx` own the browser-side Neon Auth client and provider.
- `auth/session-constants.ts` contains local mock auth cookie constants and redirect path validation helpers.
- `dm-suite/dm-suite-service.ts` defines the DM Suite service contract and exports the current implementation.

This is the layer pages and feature loaders should depend on when they need business data.

### `src/infrastructure`

Concrete implementations of application contracts.

- `mock/dm-suite-fixtures.ts` contains seeded mock data.
- `mock/dm-suite-repository.ts` implements the DM Suite service contract against those fixtures.

When Neon Postgres persistence is introduced, add a database-backed implementation here and switch the application service composition without rewriting feature pages.

### `src/features`

Feature-level code that coordinates application services for a screen or workflow.

- `app-shell` owns authenticated shell loading and layout UI.
- `dashboard` owns dashboard loading.
- `campaigns` owns campaign-scoped loaders, including tenant-scoped campaign lookup and missing-resource handling.

Feature loaders are the right place for route-specific authorization, `notFound`, and composed view data.

### `src/components/ui`

Reusable presentational primitives such as page headers, state views, and status badges. These components should not know about campaigns, sessions, auth, or persistence.

### `src/shared`

Generic helpers that are not DM Suite domain concepts, such as date formatting.

## Microservice Boundary

Do not split this MVP into deployable microservices yet. The current product has one front-end runtime, one planned auth provider, and one planned database. Premature service boundaries would add deployment, auth, observability, and data consistency cost without a clear benefit.

Use application service contracts now. Add real services later only when a boundary has an operational reason, such as long-running export jobs, billing webhooks, background email delivery, or dedicated AI processing.

## Placement Rules

- New route page: place it in `src/app`, and move data loading into `src/features/<feature>/server`.
- New business type: place it in `src/domain`.
- New persistence provider: implement it in `src/infrastructure`.
- New shared UI primitive: place it in `src/components/ui`.
- New feature-specific component: place it under `src/features/<feature>`.
- New tenant-sensitive read/write flow: expose it through `src/application` and enforce ownership in the implementation or loader.
