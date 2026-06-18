import type { AppUser } from "@/domain/dm-suite/types";

import { getSessionSecret } from "@/application/auth/credentials";
import { authSessionMaxAgeSeconds } from "@/application/auth/session-constants";

type SessionPayload = {
  user: AppUser;
  issuedAt: number;
  expiresAt: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string): Uint8Array | null {
  try {
    const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  } catch {
    return null;
  }
}

async function importSigningKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign", "verify"]
  );
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await importSigningKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
}

async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const signatureBytes = base64UrlDecode(signature);

  if (!signatureBytes) {
    return false;
  }

  const key = await importSigningKey(secret);
  return crypto.subtle.verify("HMAC", key, signatureBytes.buffer as ArrayBuffer, encoder.encode(payload));
}

function isSessionPayload(value: unknown): value is SessionPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<SessionPayload>;
  const user = payload.user as Partial<AppUser> | undefined;

  return (
    typeof payload.issuedAt === "number" &&
    typeof payload.expiresAt === "number" &&
    !!user &&
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.name === "string"
  );
}

export async function createSessionToken(user: AppUser): Promise<string> {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("APP_AUTH_SECRET is required before auth sessions can be created.");
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(
    encoder.encode(
      JSON.stringify({
        user,
        issuedAt,
        expiresAt: issuedAt + authSessionMaxAgeSeconds
      } satisfies SessionPayload)
    )
  );
  const signature = await signPayload(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<AppUser | null> {
  const secret = getSessionSecret();

  if (!token || !secret) {
    return null;
  }

  const [payload, signature, extra] = token.split(".");

  if (!payload || !signature || extra) {
    return null;
  }

  const validSignature = await verifySignature(payload, signature, secret);

  if (!validSignature) {
    return null;
  }

  const payloadBytes = base64UrlDecode(payload);

  if (!payloadBytes) {
    return null;
  }

  try {
    const parsed = JSON.parse(decoder.decode(payloadBytes));

    if (!isSessionPayload(parsed) || parsed.expiresAt <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed.user;
  } catch {
    return null;
  }
}
