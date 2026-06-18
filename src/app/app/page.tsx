import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/state-views";
import { formatDate } from "@/shared/date-format";
import { loadDashboard } from "@/features/dashboard/server/load-dashboard";

export default async function DashboardPage() {
  const { campaigns, openHookCount, recentSessions, user } = await loadDashboard();

  if (campaigns.length === 0) {
    return (
      <div className="content-wrap">
        <PageHeader
          eyebrow="Dashboard"
          title="Start your first campaign"
          description="Create a campaign, seed the first session, and build a prep page that keeps the table moving."
        />
        <EmptyState
          title="No campaigns yet"
          body="Your dashboard will show campaign cards, recent sessions, unresolved hooks, and next prep actions once a campaign exists."
          actionHref="/app/onboarding"
          actionLabel="Create first campaign"
        />
      </div>
    );
  }

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${user.name}`}
        description="Campaigns, recent sessions, and the next prep action are grouped here so the first click can move straight into useful prep."
        actions={
          <>
            <Link className="button button-secondary focus-ring" href="/app/onboarding">
              Onboarding
            </Link>
            <Link className="button button-primary focus-ring" href="/app/campaigns/new">
              New campaign
            </Link>
          </>
        }
      />

      <section className="grid grid-3" aria-label="Workspace metrics">
        <div className="metric">
          <strong>{campaigns.length}</strong>
          <span>Active campaigns</span>
        </div>
        <div className="metric">
          <strong>{recentSessions.length}</strong>
          <span>Recent sessions</span>
        </div>
        <div className="metric">
          <strong>{openHookCount}</strong>
          <span>Open hooks</span>
        </div>
      </section>

      <section className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <div className="card-title">
            <h2>Campaigns</h2>
            <Link className="button button-secondary focus-ring" href="/app/campaigns/new">
              Add
            </Link>
          </div>
          <ul className="list">
            {campaigns.map((campaign) => (
              <li className="list-item" key={campaign.id}>
                <div className="card-title">
                  <h3>{campaign.name}</h3>
                  <StatusBadge status={campaign.prepHealth} />
                </div>
                <p>{campaign.pitch}</p>
                <div className="button-row">
                  <Link
                    className="button button-primary focus-ring"
                    href={`/app/campaigns/${campaign.id}`}
                  >
                    Open
                  </Link>
                  <Link
                    className="button button-secondary focus-ring"
                    href={`/app/campaigns/${campaign.id}/sessions/${campaign.nextSessionId}`}
                  >
                    Next session
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-title">
            <h2>Recent sessions</h2>
          </div>
          <ul className="list">
            {recentSessions.map((session) => (
              <li className="list-item" key={session.id}>
                <div className="card-title">
                  <h3>{session.title}</h3>
                  <StatusBadge status={session.status} />
                </div>
                <p>
                  {formatDate(session.date)}. Prep is {session.prepProgress}% complete.
                </p>
                <div className="progress" aria-label={`${session.prepProgress}% complete`}>
                  <span style={{ width: `${session.prepProgress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
