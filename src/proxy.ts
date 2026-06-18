import { NextRequest, NextResponse } from "next/server";

import { getNeonAuth, isLocalMockAuthEnabled } from "@/application/auth/neon-auth";
import { mockSessionCookieName } from "@/application/auth/session-constants";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtectedAppRoute = pathname === "/app" || pathname.startsWith("/app/");
  const isLegacyAuthRoute = pathname === "/login" || pathname === "/signup";

  const auth = getNeonAuth();
  const legacyAuthRedirect = new URL(
    pathname === "/signup" ? "/auth/sign-up" : "/auth/sign-in",
    request.url
  );
  legacyAuthRedirect.searchParams.set("redirectTo", pathname === "/signup" ? "/app/onboarding" : "/app");

  if (auth) {
    if (isProtectedAppRoute) {
      return auth.middleware({ loginUrl: "/auth/sign-in" })(request);
    }

    if (isLegacyAuthRoute) {
      return NextResponse.redirect(legacyAuthRedirect);
    }

    return NextResponse.next();
  }

  const hasMockSession =
    isLocalMockAuthEnabled() && request.cookies.get(mockSessionCookieName)?.value === "active";

  if (isProtectedAppRoute && !hasMockSession) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    loginUrl.searchParams.set("redirectTo", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isLegacyAuthRoute && hasMockSession) {
    return NextResponse.redirect(legacyAuthRedirect);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"]
};
