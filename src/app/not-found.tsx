import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Not found</p>
        <h1>This page is not available</h1>
        <p className="muted">
          The campaign, session, or route may not exist, or you may not have access to it.
        </p>
        <Link className="button button-primary focus-ring" href="/app">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
