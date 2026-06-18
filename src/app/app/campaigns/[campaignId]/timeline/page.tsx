import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/state-views";
import { formatDate } from "@/shared/date-format";
import { loadTimeline } from "@/features/campaigns/server/campaign-loaders";

type TimelinePageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { campaignId } = await params;
  const { campaign, events } = await loadTimeline(campaignId);

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Timeline"
        title={`${campaign.name} chronology`}
        description="Manual campaign events and session recaps create continuity between sessions and source material for future exports."
        actions={
          <button className="button button-disabled" disabled type="button">
            Add event after backend
          </button>
        }
      />

      {events.length === 0 ? (
        <EmptyState
          title="No timeline events yet"
          body="Add session recaps and important changes as the campaign moves forward."
          actionHref={`/app/campaigns/${campaign.id}`}
          actionLabel="Back to overview"
        />
      ) : (
        <section className="grid">
          {events.map((event) => (
            <article className="card" key={event.id}>
              <p className="eyebrow">{formatDate(event.date)}</p>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
