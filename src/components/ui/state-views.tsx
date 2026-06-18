import Link from "next/link";

type StateViewProps = {
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, body, actionLabel, actionHref }: StateViewProps) {
  return (
    <div className="state-card">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {actionLabel && actionHref ? (
        <Link className="button button-primary focus-ring" href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function LoadingState({ title, body }: StateViewProps) {
  return (
    <div className="state-card" role="status" aria-live="polite">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: "58%" }} />
      </div>
    </div>
  );
}

export function ErrorState({ title, body, actionLabel, actionHref }: StateViewProps) {
  return (
    <div className="state-card" role="alert">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {actionLabel && actionHref ? (
        <Link className="button button-secondary focus-ring" href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function UnauthorizedState() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Authentication required</p>
        <h1>Sign in to continue</h1>
        <p className="muted">
          Campaign prep, world notes, and exports are scoped to your personal account.
        </p>
        <Link className="button button-primary focus-ring" href="/auth/sign-in">
          Go to sign in
        </Link>
      </div>
    </div>
  );
}
