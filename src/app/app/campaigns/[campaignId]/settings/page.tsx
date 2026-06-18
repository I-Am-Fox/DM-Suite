import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";
import { loadCampaign } from "@/features/campaigns/server/campaign-loaders";

type SettingsPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignSettingsPage({ params }: SettingsPageProps) {
  const { campaignId } = await params;
  const { campaign } = await loadCampaign(campaignId);

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Campaign settings"
        title={`${campaign.name} settings`}
        description="Metadata, archive/delete controls, and portability settings live here, with destructive operations deferred until server authorization exists."
      />

      <section className="grid grid-2">
        <form className="card form-stack">
          <h2>Campaign metadata</h2>
          <label className="field">
            <span>Name</span>
            <input className="input focus-ring" defaultValue={campaign.name} />
          </label>
          <label className="field">
            <span>System</span>
            <input className="input focus-ring" defaultValue={campaign.system} />
          </label>
          <label className="field">
            <span>Pitch</span>
            <textarea className="input focus-ring" defaultValue={campaign.pitch} rows={5} />
          </label>
          <button className="button button-disabled" disabled type="button">
            Save after backend
          </button>
        </form>

        <div className="grid">
          <div className="card">
            <h2>Portability</h2>
            <p>
              Campaign exports will be managed server-side from the export center and scoped to
              the authenticated owner.
            </p>
            <Link
              className="button button-secondary focus-ring"
              href={`/app/campaigns/${campaign.id}/exports`}
            >
              Open exports
            </Link>
          </div>

          <div className="card danger-zone">
            <h2>Archive and delete</h2>
            <p>
              Destructive controls require server-side authorization, confirmation, and a clear
              data recovery or export path.
            </p>
            <div className="button-row">
              <button className="button button-disabled" disabled type="button">
                Archive campaign
              </button>
              <button className="button button-danger button-disabled" disabled type="button">
                Delete campaign
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
