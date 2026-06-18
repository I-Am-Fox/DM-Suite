import { AuthView } from "@neondatabase/auth/react";
import Link from "next/link";

import { isLocalMockAuthEnabled, isNeonAuthConfigured } from "@/application/auth/neon-auth";

type AuthPageProps = {
  params: Promise<{
    path: string;
  }>;
  searchParams?: Promise<{
    redirectTo?: string;
  }>;
};

export default async function AuthPage({ params, searchParams }: AuthPageProps) {
  const [{ path }, query] = await Promise.all([params, searchParams]);
  const redirectTo = query?.redirectTo ?? "/app";

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand-mark focus-ring" href="/">
          <span className="brand-glyph" aria-hidden="true">
            DM
          </span>
          <span>DM Suite</span>
        </Link>
        <div style={{ marginTop: 24 }}>
          {isNeonAuthConfigured() ? (
            <AuthView path={path} redirectTo={redirectTo} />
          ) : isLocalMockAuthEnabled() ? (
            <div className="grid">
              <p className="eyebrow">Local auth fallback</p>
              <h1>Neon Auth is not configured</h1>
              <p className="muted">
                Add Neon Auth environment variables to enable the real hosted auth flow. Until
                then, local development can use the mock session.
              </p>
              <Link
                className="button button-primary focus-ring"
                href={`/auth/mock-login?next=${encodeURIComponent(redirectTo)}`}
              >
                Continue with local mock session
              </Link>
            </div>
          ) : (
            <div className="grid">
              <p className="eyebrow">Auth unavailable</p>
              <h1>Neon Auth is not configured</h1>
              <p className="muted">
                This environment requires Neon Auth credentials before sign-in can be used.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
