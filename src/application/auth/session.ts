import "server-only";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getNeonAuth, isLocalMockAuthEnabled } from "@/application/auth/neon-auth";
import { mockSessionCookieName } from "@/application/auth/session-constants";
import { mockUser } from "@/infrastructure/mock/dm-suite-fixtures";
import type { AppUser } from "@/domain/dm-suite/types";

export async function getCurrentUser(): Promise<AppUser | null> {
  const auth = getNeonAuth();

  if (auth) {
    const { data: session } = await auth.getSession();
    const user = session?.user;

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name || user.email
    };
  }

  if (!isLocalMockAuthEnabled()) {
    return null;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(mockSessionCookieName);

  if (session?.value !== "active") {
    return null;
  }

  return mockUser;
}

export async function requireCurrentUser(): Promise<AppUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}
