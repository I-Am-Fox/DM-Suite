import { NextRequest, NextResponse } from "next/server";

import { verifySessionToken } from "@/application/auth/session-token";
import { authSessionCookieName } from "@/application/auth/session-constants";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtectedAppRoute = pathname === "/app" || pathname.startsWith("/app/");
  const isLegacyAuthRoute = pathname === "/login" || pathname === "/signup";
  const hasSession = Boolean(
    await verifySessionToken(request.cookies.get(authSessionCookieName)?.value)
  );
  const legacyAuthRedirect = new URL(
    pathname === "/signup" ? "/auth/sign-up" : "/auth/sign-in",
    request.url
  );
  legacyAuthRedirect.searchParams.set("redirectTo", pathname === "/signup" ? "/app/onboarding" : "/app");

  if (isProtectedAppRoute && !hasSession) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    loginUrl.searchParams.set("redirectTo", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isLegacyAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (isLegacyAuthRoute) {
    return NextResponse.redirect(legacyAuthRedirect);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"]
};
