import Link from "next/link";

export default function CampaignNotFound() {
  return (
    <div className="content-wrap">
      <div className="state-card">
        <p className="eyebrow">Campaign unavailable</p>
        <h1>Campaign not found</h1>
        <p>
          This campaign may not exist, may be archived, or may not belong to the current account.
        </p>
        <Link className="button button-primary focus-ring" href="/app">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
