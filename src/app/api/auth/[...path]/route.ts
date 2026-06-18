import { NextRequest, NextResponse } from "next/server";

import {
  authenticateCredentials,
  canCreateDevelopmentSignup,
  createDevelopmentSignupUser
} from "@/application/auth/credentials";
import {
  authSessionCookieName,
  authSessionMaxAgeSeconds,
  internalNextPath
} from "@/application/auth/session-constants";
import { createSessionToken } from "@/application/auth/session-token";

type AuthRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export const dynamic = "force-dynamic";

function formString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function authRedirect(request: NextRequest, path: string, error: string, redirectTo: string) {
  const url = new URL(path, request.url);
  url.searchParams.set("redirectTo", redirectTo);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

async function createSignedSessionResponse(request: NextRequest, redirectTo: string, formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");
  const user = authenticateCredentials(email, password);

  if (!user) {
    return authRedirect(request, "/auth/sign-in", "invalid-credentials", redirectTo);
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  const token = await createSessionToken(user);

  response.cookies.set(authSessionCookieName, token, {
    httpOnly: true,
    maxAge: authSessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}

async function createDevelopmentSignupResponse(
  request: NextRequest,
  redirectTo: string,
  formData: FormData
) {
  if (!canCreateDevelopmentSignup()) {
    return authRedirect(request, "/auth/sign-up", "signup-unavailable", redirectTo);
  }

  const email = formString(formData, "email");
  const name = formString(formData, "name");
  const password = formString(formData, "password");

  if (!email.includes("@") || password.length < 8) {
    return authRedirect(request, "/auth/sign-up", "invalid-signup", redirectTo);
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  const token = await createSessionToken(createDevelopmentSignupUser(name, email));

  response.cookies.set(authSessionCookieName, token, {
    httpOnly: true,
    maxAge: authSessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}

async function clearSessionResponse(request: NextRequest) {
  const redirectTo = internalNextPath(request.nextUrl.searchParams.get("redirectTo"));
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  response.cookies.delete(authSessionCookieName);

  return response;
}

export async function GET(request: NextRequest, context: AuthRouteContext) {
  const path = (await context.params).path.join("/");

  if (path === "sign-out") {
    return clearSessionResponse(request);
  }

  return NextResponse.json({ error: "Auth route not found." }, { status: 404 });
}

export async function POST(request: NextRequest, context: AuthRouteContext) {
  const path = (await context.params).path.join("/");
  const formData = await request.formData();
  const redirectTo = internalNextPath(formString(formData, "redirectTo"));

  if (path === "sign-in") {
    return createSignedSessionResponse(request, redirectTo, formData);
  }

  if (path === "sign-up") {
    return createDevelopmentSignupResponse(request, redirectTo, formData);
  }

  if (path === "sign-out") {
    return clearSessionResponse(request);
  }

  return NextResponse.json({ error: "Auth route not found." }, { status: 404 });
}
