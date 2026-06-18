# Next.js-Native Auth

DM Suite uses a small framework-native auth layer instead of a hosted provider.

## Runtime Shape

- `src/application/auth/credentials.ts` resolves environment-backed credentials and a development fallback.
- `src/application/auth/session-token.ts` creates and verifies signed session cookies with Web Crypto HMAC.
- `src/application/auth/session.ts` exposes `getCurrentUser` and `requireCurrentUser`.
- `src/app/auth/[path]/page.tsx` renders server-side auth forms.
- `src/app/api/auth/[...path]/route.ts` handles sign-in, local sign-up, and sign-out.
- `src/proxy.ts` protects `/app/*` by verifying the signed session cookie.

## Environment Variables

Required for production sign-in:

```bash
APP_AUTH_SECRET=
APP_AUTH_EMAIL=
APP_AUTH_PASSWORD=
APP_AUTH_USER_NAME=
APP_AUTH_USER_ID=usr_demo_dm
```

`APP_AUTH_SECRET` must be at least 32 characters and must stay server-only.

`APP_AUTH_USER_ID` defaults to `usr_demo_dm` so the current mock campaign fixtures remain visible. When a database-backed user store lands, user IDs should come from the persisted account record instead.

## Local Development

When production credentials are not configured and `NODE_ENV` is not `production`, the app exposes a development fallback:

```text
morgan@example.com
dm-suite-dev
```

Local development also allows `/auth/sign-up` to create a signed session for the submitted email. This is intentionally not available in production because the current app does not persist users yet.

## Data Boundary

Authentication now returns a signed-cookie user, but campaign data still comes from the mock DM Suite service. The next backend step is to add persistent user and campaign storage under `src/infrastructure` and switch `src/application/dm-suite/dm-suite-service.ts` to that implementation.
