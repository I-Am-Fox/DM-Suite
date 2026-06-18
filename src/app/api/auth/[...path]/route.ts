import { NextResponse } from "next/server";

import { getNeonAuth } from "@/application/auth/neon-auth";

type AuthRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export const dynamic = "force-dynamic";

function authUnavailable() {
  return NextResponse.json(
    {
      error:
        "Neon Auth is not configured. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET."
    },
    { status: 503 }
  );
}

export async function GET(request: Request, context: AuthRouteContext) {
  const auth = getNeonAuth();
  return auth ? auth.handler().GET(request, context) : authUnavailable();
}

export async function POST(request: Request, context: AuthRouteContext) {
  const auth = getNeonAuth();
  return auth ? auth.handler().POST(request, context) : authUnavailable();
}

export async function PUT(request: Request, context: AuthRouteContext) {
  const auth = getNeonAuth();
  return auth ? auth.handler().PUT(request, context) : authUnavailable();
}

export async function PATCH(request: Request, context: AuthRouteContext) {
  const auth = getNeonAuth();
  return auth ? auth.handler().PATCH(request, context) : authUnavailable();
}

export async function DELETE(request: Request, context: AuthRouteContext) {
  const auth = getNeonAuth();
  return auth ? auth.handler().DELETE(request, context) : authUnavailable();
}
