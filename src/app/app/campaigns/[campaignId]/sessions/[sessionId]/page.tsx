import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/state-views";
import { prepBlockLabels } from "@/domain/dm-suite/labels";
import { loadSessionPrepWorkspace } from "@/features/campaigns/server/campaign-loaders";
import { formatDate, formatDateTime } from "@/shared/date-format";

type SessionPrepPageProps = {
  params: Promise<{
    campaignId: string;
    sessionId: string;
  }>;
  searchParams?: Promise<{
    state?: string;
  }>;
};

export default async function SessionPrepPage({ params, searchParams }: SessionPrepPageProps) {
  const [{ campaignId, sessionId }, query] = await Promise.all([params, searchParams]);
  const { campaign, session, blocks, context } = await loadSessionPrepWorkspace(
    campaignId,
    sessionId
  );

  if (query?.state === "loading") {
    return (
      <div className="content-wrap">
        <LoadingState
          title="Loading session prep"
          body="Fetching the ordered prep blocks and linked campaign context."
        />
      </div>
    );
  }

  if (query?.state === "error") {
    return (
      <div className="content-wrap">
        <ErrorState
          title="Session prep could not load"
          body="The workspace should keep a clear recovery path when campaign data fails to load."
          actionHref={`/app/campaigns/${campaign.id}/sessions/${session.id}`}
          actionLabel="Retry workspace"
        />
      </div>
    );
  }

  const visibleBlocks = query?.state === "empty" ? [] : blocks;

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow={`${campaign.name} / Session prep`}
        title={session.title}
        description={`${formatDate(session.date)}. Last edited ${formatDateTime(
          session.lastEditedAt
        )}.`}
        actions={
          <>
            <Link
              className="button button-secondary focus-ring"
              href={`/app/campaigns/${campaign.id}/exports`}
            >
              Export path
            </Link>
            <button className="button button-disabled" disabled type="button">
              Add block after backend
            </button>
          </>
        }
      />

      <section className="workspace-grid">
        <div className="grid">
          <div className="card">
            <div className="card-title">
              <h2>Prep canvas</h2>
              <StatusBadge status={session.status} />
            </div>

            {visibleBlocks.length === 0 ? (
              <EmptyState
                title="Start with a scene or note"
                body="Fast templates keep the user out of a blank page while still supporting freeform prep."
                actionHref={`/app/campaigns/${campaign.id}/sessions/${session.id}`}
                actionLabel="Show seeded blocks"
              />
            ) : (
              visibleBlocks.map((block) => (
                <article className="prep-block list-item" key={block.id}>
                  <span className="prep-block-type">{prepBlockLabels[block.type]}</span>
                  <div className="card-title">
                    <h3>{block.title}</h3>
                    <StatusBadge status={block.isComplete ? "ready" : "draft"} />
                  </div>
                  <p>{block.body}</p>
                </article>
              ))
            )}
          </div>

          <div className="card">
            <h2>Quick block templates</h2>
            <div className="tag-row">
              {[
                "Opening scene",
                "Social cue",
                "Travel obstacle",
                "Secret reveal",
                "Loose end",
                "Treasure note"
              ].map((template) => (
                <span className="tag" key={template}>
                  {template}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="grid" aria-label="Session context">
          <div className="card">
            <h2>Linked context</h2>
            <section>
              <h3>NPCs</h3>
              <ul className="list">
                {context.npcs.map((entity) => (
                  <li className="list-item" key={entity.id}>
                    <strong>{entity.name}</strong>
                    <p>{entity.role}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section style={{ marginTop: 14 }}>
              <h3>Locations</h3>
              <ul className="list">
                {context.locations.map((entity) => (
                  <li className="list-item" key={entity.id}>
                    <strong>{entity.name}</strong>
                    <p>{entity.status}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section style={{ marginTop: 14 }}>
              <h3>Factions</h3>
              <ul className="list">
                {context.factions.map((entity) => (
                  <li className="list-item" key={entity.id}>
                    <strong>{entity.name}</strong>
                    <p>{entity.status}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="card">
            <h2>Previous recap</h2>
            <p>{context.previousRecap ?? "No previous recap is available."}</p>
          </div>

          <div className="card">
            <h2>Reminders and open questions</h2>
            <ul className="list">
              {context.reminders.map((reminder) => (
                <li className="list-item" key={reminder}>
                  {reminder}
                </li>
              ))}
              {context.unresolvedHooks.map((hook) => (
                <li className="list-item" key={hook}>
                  {hook}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
