export const authSessionCookieName = "dm_suite_session";
export const authSessionMaxAgeSeconds = 60 * 60 * 24 * 7;

export function internalNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/app";
  }

  return value;
}
