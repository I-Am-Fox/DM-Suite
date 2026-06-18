import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatDateTime } from "@/shared/date-format";
import { loadCampaignWorkspace } from "@/features/campaigns/server/campaign-loaders";

type CampaignPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignOverviewPage({ params }: CampaignPageProps) {
  const { campaignId } = await params;
  const { campaign, nextSession, sessions } = await loadCampaignWorkspace(campaignId);

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Campaign overview"
        title={campaign.name}
        description={campaign.pitch}
        actions={
          <>
            <Link
              className="button button-secondary focus-ring"
              href={`/app/campaigns/${campaign.id}/world`}
            >
              Open world
            </Link>
            <Link
              className="button button-primary focus-ring"
              href={`/app/campaigns/${campaign.id}/sessions/${campaign.nextSessionId}`}
            >
              Prep next session
            </Link>
          </>
        }
      />

      <section className="grid grid-3" aria-label="Campaign metrics">
        <div className="metric">
          <strong>{sessions.length}</strong>
          <span>Sessions</span>
        </div>
        <div className="metric">
          <strong>{campaign.unresolvedHooks.length}</strong>
          <span>Unresolved hooks</span>
        </div>
        <div className="metric">
          <strong>{campaign.system}</strong>
          <span>Game system</span>
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <div className="card-title">
            <h2>Next session</h2>
            <StatusBadge status={campaign.prepHealth} />
          </div>
          {nextSession ? (
            <>
              <h3>{nextSession.title}</h3>
              <p>
                {formatDate(nextSession.date)}. Last edited{" "}
                {formatDateTime(nextSession.lastEditedAt)}.
              </p>
              <div className="progress" aria-label={`${nextSession.prepProgress}% complete`}>
                <span style={{ width: `${nextSession.prepProgress}%` }} />
              </div>
              <div className="button-row" style={{ marginTop: 14 }}>
                <Link
                  className="button button-primary focus-ring"
                  href={`/app/campaigns/${campaign.id}/sessions/${nextSession.id}`}
                >
                  Open prep
                </Link>
                <Link
                  className="button button-secondary focus-ring"
                  href={`/app/campaigns/${campaign.id}/sessions`}
                >
                  All sessions
                </Link>
              </div>
            </>
          ) : (
            <p>No next session has been selected.</p>
          )}
        </div>

        <div className="card">
          <h2>Quick actions</h2>
          <div className="grid">
            <Link
              className="button button-secondary focus-ring"
              href={`/app/campaigns/${campaign.id}/sessions`}
            >
              Review sessions
            </Link>
            <Link
              className="button button-secondary focus-ring"
              href={`/app/campaigns/${campaign.id}/timeline`}
            >
              Add recap event
            </Link>
            <Link
              className="button button-secondary focus-ring"
              href={`/app/campaigns/${campaign.id}/exports`}
            >
              Check export path
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Unresolved hooks</h2>
          <ul className="list">
            {campaign.unresolvedHooks.map((hook) => (
              <li className="list-item" key={hook}>
                {hook}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Recent notes</h2>
          <ul className="list">
            {campaign.recentNotes.map((note) => (
              <li className="list-item" key={note}>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
