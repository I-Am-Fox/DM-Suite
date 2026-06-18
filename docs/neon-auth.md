# Neon Auth Integration

DM Suite uses Neon Auth as the selected authentication provider.

## Runtime Shape

- `src/application/auth/neon-auth.ts` lazily creates the Neon Auth server instance.
- `src/application/auth/session.ts` exposes `getCurrentUser` and `requireCurrentUser`.
- `src/application/auth/auth-client.ts` creates the browser auth client.
- `src/application/auth/auth-provider.tsx` wraps the app in `NeonAuthUIProvider`.
- `src/app/api/auth/[...path]/route.ts` proxies auth API calls to Neon Auth.
- `src/app/auth/[path]/page.tsx` renders Neon Auth UI screens.
- `src/proxy.ts` protects `/app/*` using Neon Auth when configured.

## Environment Variables

Required for real Neon Auth:

```bash
NEON_AUTH_BASE_URL=
NEON_AUTH_COOKIE_SECRET=
```

`NEON_AUTH_COOKIE_SECRET` must be at least 32 characters. Generate one with a cryptographically secure random source.

The app also reserves:

```bash
DATABASE_URL=
```

for Neon Postgres application data.

## Local Development Fallback

If Neon Auth is not configured and `NODE_ENV` is not `production`, `/auth/sign-in` shows a local mock-session button. This is only for development before Neon credentials exist.

The production app must not depend on the mock auth cookie. If Neon Auth env vars are missing in production, auth routes return unavailable states instead of creating a mock session.

## Data Boundary

Authentication now returns a real Neon user when configured, but campaign data still comes from the mock DM Suite service. The next backend step is to add a Neon Postgres persistence implementation under `src/infrastructure` and switch `src/application/dm-suite/dm-suite-service.ts` to that implementation.
