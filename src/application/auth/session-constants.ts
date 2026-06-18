export const mockSessionCookieName = "dm_suite_mock_session";

export function internalNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/app";
  }

  return value;
}
