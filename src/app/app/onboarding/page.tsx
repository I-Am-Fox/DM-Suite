import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";

export default function OnboardingPage() {
  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Onboarding"
        title="Create a campaign and seed the first session"
        description="The MVP activation path is intentionally short: account, campaign, session, usable prep workspace."
      />

      <section className="grid grid-2">
        <form className="card form-stack" action="/app/campaigns/cmp-emberfall" method="get">
          <h2>Campaign basics</h2>
          <label className="field">
            <span>Campaign name</span>
            <input className="input focus-ring" name="campaign" defaultValue="Emberfall Frontier" />
          </label>
          <label className="field">
            <span>System</span>
            <input className="input focus-ring" name="system" defaultValue="D&D 5e" />
          </label>
          <label className="field">
            <span>Campaign promise</span>
            <textarea
              className="input focus-ring"
              name="pitch"
              defaultValue="Old oaths, mining towns, and a fire under the mountains."
              rows={4}
            />
          </label>
          <button className="button button-primary focus-ring" type="submit">
            Create preview campaign
          </button>
        </form>

        <div className="card">
          <h2>First session seed</h2>
          <p>
            A first session is created alongside the campaign in the future backend flow. In this
            front-end scaffold, the seeded session opens directly into the prep workspace.
          </p>
          <ul className="list">
            <li className="list-item">
              <strong>Session title</strong>
              <p>The Ash Road Ambush</p>
            </li>
            <li className="list-item">
              <strong>Prep model</strong>
              <p>Hybrid blocks with structured cues and freeform writing.</p>
            </li>
            <li className="list-item">
              <strong>First useful action</strong>
              <p>Add or refine a scene so the session can start at the table.</p>
            </li>
          </ul>
          <div className="button-row">
            <Link
              className="button button-secondary focus-ring"
              href="/app/campaigns/cmp-emberfall/sessions/ses-ash-road"
            >
              Open seeded prep
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
