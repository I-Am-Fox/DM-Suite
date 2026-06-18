import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/state-views";
import { worldKindLabels } from "@/domain/dm-suite/labels";
import {
  loadWorldTracker,
  worldEntityKinds
} from "@/features/campaigns/server/campaign-loaders";

type WorldPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function WorldPage({ params, searchParams }: WorldPageProps) {
  const [{ campaignId }, query] = await Promise.all([params, searchParams]);
  const { activeTab, campaign, entities } = await loadWorldTracker(campaignId, query?.tab);

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="World tracker"
        title={`${campaign.name} world`}
        description="NPCs, locations, factions, and important items stay in one campaign tracker for the first MVP version."
        actions={
          <button className="button button-disabled" disabled type="button">
            Add entity after backend
          </button>
        }
      />

      <nav className="tabs" aria-label="World tracker tabs">
        {worldEntityKinds.map((tab) => (
          <Link
            className={`tab focus-ring ${activeTab === tab ? "tab-active" : ""}`}
            href={`/app/campaigns/${campaign.id}/world?tab=${tab}`}
            key={tab}
          >
            {worldKindLabels[tab]}
          </Link>
        ))}
      </nav>

      {entities.length === 0 ? (
        <EmptyState
          title={`No ${worldKindLabels[activeTab].toLowerCase()} yet`}
          body="Add linked campaign context as it becomes useful for prep. The tracker should stay practical, not exhaustive."
          actionHref={`/app/campaigns/${campaign.id}/sessions/${campaign.nextSessionId}`}
          actionLabel="Back to prep"
        />
      ) : (
        <section className="grid grid-2">
          {entities.map((entity) => (
            <article className="card" key={entity.id}>
              <div className="card-title">
                <h2>{entity.name}</h2>
                <span className="tag">{entity.status}</span>
              </div>
              <p>{entity.role}</p>
              <p>
                <strong>Last appeared:</strong> {entity.lastAppeared}
              </p>
              <div className="tag-row">
                {entity.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
