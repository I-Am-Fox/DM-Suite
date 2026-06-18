import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { loadExportCenter } from "@/features/campaigns/server/campaign-loaders";

type ExportsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function ExportsPage({ params }: ExportsPageProps) {
  const { campaignId } = await params;
  const { campaign, exportRequests } = await loadExportCenter(campaignId);

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Exports"
        title={`${campaign.name} export center`}
        description="The route exists early so portability is visible, but export actions remain disabled until authenticated server-side generation exists."
      />

      <section className="grid grid-2">
        {exportRequests.map((request) => (
          <article className="card" key={request.id}>
            <div className="card-title">
              <h2>{request.label}</h2>
              <StatusBadge status={request.status} />
            </div>
            <p>{request.description}</p>
            <p>
              <strong>Format:</strong> {request.format.toUpperCase()}
            </p>
            <button className="button button-disabled" disabled type="button">
              Generate after server export
            </button>
          </article>
        ))}
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Server-side export requirements</h2>
        <ul className="list">
          <li className="list-item">Require an authenticated session.</li>
          <li className="list-item">Scope campaign data by both campaign ID and owner user ID.</li>
          <li className="list-item">Generate Markdown and PDF output on the server.</li>
          <li className="list-item">Avoid exposing private campaign content in public URLs.</li>
        </ul>
      </section>
    </div>
  );
}
