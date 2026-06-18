import { createNeonAuth, type NeonAuth } from "@neondatabase/auth/next/server";

const minimumCookieSecretLength = 32;

let cachedAuth: NeonAuth | null | undefined;

export function isNeonAuthConfigured(): boolean {
  return Boolean(
    process.env.NEON_AUTH_BASE_URL &&
      process.env.NEON_AUTH_COOKIE_SECRET &&
      process.env.NEON_AUTH_COOKIE_SECRET.length >= minimumCookieSecretLength
  );
}

export function isLocalMockAuthEnabled(): boolean {
  return process.env.NODE_ENV !== "production" && !isNeonAuthConfigured();
}

export function getNeonAuth(): NeonAuth | null {
  if (!isNeonAuthConfigured()) {
    return null;
  }

  if (cachedAuth !== undefined) {
    return cachedAuth;
  }

  cachedAuth = createNeonAuth({
    baseUrl: process.env.NEON_AUTH_BASE_URL!,
    cookies: {
      secret: process.env.NEON_AUTH_COOKIE_SECRET!,
      sessionDataTtl: 300
    },
    logLevel: "warn"
  });

  return cachedAuth;
}

export function requireNeonAuth(): NeonAuth {
  const auth = getNeonAuth();

  if (!auth) {
    throw new Error(
      "Neon Auth is not configured. Set NEON_AUTH_BASE_URL and a 32+ character NEON_AUTH_COOKIE_SECRET."
    );
  }

  return auth;
}
