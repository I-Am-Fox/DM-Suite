import "server-only";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { verifySessionToken } from "@/application/auth/session-token";
import { authSessionCookieName } from "@/application/auth/session-constants";
import type { AppUser } from "@/domain/dm-suite/types";

export async function getCurrentUser(): Promise<AppUser | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(authSessionCookieName)?.value);
}

export async function requireCurrentUser(): Promise<AppUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}
