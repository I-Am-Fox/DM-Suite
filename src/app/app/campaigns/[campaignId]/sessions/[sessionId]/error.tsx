"use client";

import Link from "next/link";

type SessionPrepErrorProps = {
  reset: () => void;
};

export default function SessionPrepError({ reset }: SessionPrepErrorProps) {
  return (
    <div className="content-wrap">
      <div className="state-card" role="alert">
        <p className="eyebrow">Session error</p>
        <h1>Session prep could not load</h1>
        <p>
          The prep workspace needs a clear recovery path if blocks or linked campaign context fail
          to load.
        </p>
        <div className="button-row">
          <button className="button button-primary focus-ring" onClick={reset} type="button">
            Try again
          </button>
          <Link className="button button-secondary focus-ring" href="/app">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
