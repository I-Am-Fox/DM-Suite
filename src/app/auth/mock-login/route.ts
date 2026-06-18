import { NextRequest, NextResponse } from "next/server";

import { isLocalMockAuthEnabled } from "@/application/auth/neon-auth";
import { internalNextPath, mockSessionCookieName } from "@/application/auth/session-constants";

export function GET(request: NextRequest) {
  if (!isLocalMockAuthEnabled()) {
    return NextResponse.json({ error: "Local mock auth is disabled." }, { status: 404 });
  }

  const next = internalNextPath(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(next, request.url));

  response.cookies.set(mockSessionCookieName, "active", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}
