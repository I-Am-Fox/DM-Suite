import type { AppUser } from "@/domain/dm-suite/types";

const minimumSecretLength = 32;

const developmentUser: AppUser = {
  id: "usr_demo_dm",
  name: "Morgan Vale",
  email: "morgan@example.com"
};

const developmentPassword = "dm-suite-dev";
const developmentSecret = "development-only-dm-suite-auth-secret";

export type AuthMode = "configured" | "development" | "unavailable";

export type CredentialAuthConfig = {
  mode: AuthMode;
  user: AppUser;
  password: string;
  secret: string;
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function envValue(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function configuredUser(): AppUser | null {
  const email = envValue("APP_AUTH_EMAIL");
  const password = process.env.APP_AUTH_PASSWORD;
  const secret = process.env.APP_AUTH_SECRET;

  if (!email || !password || !secret || secret.length < minimumSecretLength) {
    return null;
  }

  return {
    id: envValue("APP_AUTH_USER_ID") ?? developmentUser.id,
    email: email.toLowerCase(),
    name: envValue("APP_AUTH_USER_NAME") ?? email
  };
}

export function getCredentialAuthConfig(): CredentialAuthConfig | null {
  const user = configuredUser();

  if (user) {
    return {
      mode: "configured",
      user,
      password: process.env.APP_AUTH_PASSWORD!,
      secret: process.env.APP_AUTH_SECRET!
    };
  }

  if (!isProduction()) {
    return {
      mode: "development",
      user: developmentUser,
      password: developmentPassword,
      secret: developmentSecret
    };
  }

  return null;
}

export function getAuthMode(): AuthMode {
  return getCredentialAuthConfig()?.mode ?? "unavailable";
}

export function getSessionSecret(): string | null {
  return getCredentialAuthConfig()?.secret ?? null;
}

export function getDevelopmentCredentialHint(): { email: string; password: string } | null {
  const config = getCredentialAuthConfig();

  if (config?.mode !== "development") {
    return null;
  }

  return {
    email: config.user.email,
    password: config.password
  };
}

export function authenticateCredentials(email: string, password: string): AppUser | null {
  const config = getCredentialAuthConfig();

  if (!config) {
    return null;
  }

  if (email.trim().toLowerCase() !== config.user.email.toLowerCase()) {
    return null;
  }

  if (password !== config.password) {
    return null;
  }

  return config.user;
}

export function canCreateDevelopmentSignup(): boolean {
  return !isProduction();
}

export function createDevelopmentSignupUser(name: string, email: string): AppUser {
  return {
    id: envValue("APP_AUTH_USER_ID") ?? developmentUser.id,
    email: email.trim().toLowerCase(),
    name: name.trim() || email.trim().toLowerCase()
  };
}
