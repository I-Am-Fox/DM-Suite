import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/state-views";
import { formatDate, formatDateTime } from "@/shared/date-format";
import { loadCampaignSessions } from "@/features/campaigns/server/campaign-loaders";

type SessionsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function SessionsPage({ params }: SessionsPageProps) {
  const { campaignId } = await params;
  const { campaign, sessions } = await loadCampaignSessions(campaignId);

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Sessions"
        title={`${campaign.name} sessions`}
        description="Track prep status, recaps, and the next session workspace from one campaign-scoped list."
        actions={
          <button className="button button-disabled" disabled type="button">
            New session after backend
          </button>
        }
      />

      {sessions.length === 0 ? (
        <EmptyState
          title="No sessions yet"
          body="Create the first session to start building scenes, cues, secrets, and reminders."
          actionHref={`/app/campaigns/${campaign.id}`}
          actionLabel="Back to overview"
        />
      ) : (
        <section className="grid grid-2">
          {sessions.map((session) => (
            <article className="card" key={session.id}>
              <div className="card-title">
                <h2>{session.title}</h2>
                <StatusBadge status={session.status} />
              </div>
              <p>
                {formatDate(session.date)}. Last edited {formatDateTime(session.lastEditedAt)}.
              </p>
              <p>{session.recap}</p>
              <div className="progress" aria-label={`${session.prepProgress}% complete`}>
                <span style={{ width: `${session.prepProgress}%` }} />
              </div>
              <div className="button-row" style={{ marginTop: 14 }}>
                <Link
                  className="button button-primary focus-ring"
                  href={`/app/campaigns/${campaign.id}/sessions/${session.id}`}
                >
                  Open prep
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
