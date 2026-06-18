import Link from "next/link";
import { redirect } from "next/navigation";

import {
  canCreateDevelopmentSignup,
  getAuthMode,
  getDevelopmentCredentialHint
} from "@/application/auth/credentials";
import { internalNextPath } from "@/application/auth/session-constants";

type AuthPageProps = {
  params: Promise<{
    path: string;
  }>;
  searchParams?: Promise<{
    redirectTo?: string;
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "invalid-credentials": "The email or password did not match the configured account.",
  "invalid-signup": "Use a valid email address and a password with at least 8 characters.",
  "signup-unavailable": "Persistent sign-up needs a database-backed user store before production use."
};

function AuthChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand-mark focus-ring" href="/">
          <span className="brand-glyph" aria-hidden="true">
            DM
          </span>
          <span>DM Suite</span>
        </Link>
        <div className="auth-card-body">{children}</div>
      </section>
    </main>
  );
}

function ErrorMessage({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="auth-error">{errorMessages[error] ?? "Authentication failed."}</p>;
}

function DevelopmentHint() {
  const hint = getDevelopmentCredentialHint();

  if (!hint) {
    return null;
  }

  return (
    <div className="auth-help">
      <strong>Development credentials</strong>
      <span>{hint.email}</span>
      <span>{hint.password}</span>
    </div>
  );
}

function SignInForm({ redirectTo, error }: { redirectTo: string; error?: string }) {
  const mode = getAuthMode();

  if (mode === "unavailable") {
    return (
      <div className="grid">
        <p className="eyebrow">Auth unavailable</p>
        <h1>Configure Next.js auth</h1>
        <p className="muted">
          Set APP_AUTH_EMAIL, APP_AUTH_PASSWORD, and a 32+ character APP_AUTH_SECRET before
          signing in.
        </p>
      </div>
    );
  }

  return (
    <form className="form-stack" action="/api/auth/sign-in" method="post">
      <div>
        <p className="eyebrow">Sign in</p>
        <h1>Open your DM workspace</h1>
        <p className="muted">
          This uses Next.js route handlers, server-side cookies, and proxy protection instead of
          a hosted auth provider.
        </p>
      </div>

      <ErrorMessage error={error} />
      <input name="redirectTo" type="hidden" value={redirectTo} />

      <label className="field">
        <span>Email</span>
        <input className="input focus-ring" name="email" required type="email" />
      </label>

      <label className="field">
        <span>Password</span>
        <input className="input focus-ring" name="password" required type="password" />
      </label>

      <button className="button button-primary focus-ring" type="submit">
        Sign in
      </button>

      <DevelopmentHint />

      <p className="auth-switch">
        Need a local account for development?{" "}
        <Link href={`/auth/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`}>Create one</Link>
      </p>
    </form>
  );
}

function SignUpForm({ redirectTo, error }: { redirectTo: string; error?: string }) {
  const signupEnabled = canCreateDevelopmentSignup();

  return (
    <form className="form-stack" action="/api/auth/sign-up" method="post">
      <div>
        <p className="eyebrow">Sign up</p>
        <h1>Create a local workspace</h1>
        <p className="muted">
          Sign-up is available for local development while persistent user storage is still
          planned. Production should use configured sign-in credentials until that store lands.
        </p>
      </div>

      {!signupEnabled ? (
        <p className="auth-error">Production sign-up is disabled until persistent user storage exists.</p>
      ) : (
        <ErrorMessage error={error} />
      )}

      <input name="redirectTo" type="hidden" value={redirectTo} />

      <label className="field">
        <span>Name</span>
        <input className="input focus-ring" name="name" required type="text" />
      </label>

      <label className="field">
        <span>Email</span>
        <input className="input focus-ring" name="email" required type="email" />
      </label>

      <label className="field">
        <span>Password</span>
        <input className="input focus-ring" minLength={8} name="password" required type="password" />
      </label>

      <button className="button button-primary focus-ring" disabled={!signupEnabled} type="submit">
        Create local account
      </button>

      <p className="auth-switch">
        Already have configured credentials?{" "}
        <Link href={`/auth/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`}>Sign in</Link>
      </p>
    </form>
  );
}

export default async function AuthPage({ params, searchParams }: AuthPageProps) {
  const [{ path }, query] = await Promise.all([params, searchParams]);
  const redirectTo = internalNextPath(query?.redirectTo ?? "/app");

  if (path === "sign-out") {
    redirect(`/api/auth/sign-out?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  if (path === "sign-up") {
    return (
      <AuthChrome>
        <SignUpForm error={query?.error} redirectTo={redirectTo} />
      </AuthChrome>
    );
  }

  if (path === "forgot-password") {
    return (
      <AuthChrome>
        <div className="grid">
          <p className="eyebrow">Password reset</p>
          <h1>Password reset is not connected yet</h1>
          <p className="muted">
            The Next.js-native MVP uses configured credentials and signed sessions. Email-based
            password resets require a persistent user store and email provider.
          </p>
          <Link className="button button-primary focus-ring" href="/auth/sign-in">
            Back to sign in
          </Link>
        </div>
      </AuthChrome>
    );
  }

  return (
    <AuthChrome>
      <SignInForm error={query?.error} redirectTo={redirectTo} />
    </AuthChrome>
  );
}
