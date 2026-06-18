import Link from "next/link";

import { PageHeader } from "@/components/ui/page-header";

export default function NewCampaignPage() {
  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="New campaign"
        title="Create a campaign"
        description="Campaigns are the tenant-scoped workspace for sessions, world notes, timeline events, and future exports."
      />

      <section className="grid grid-2">
        <form className="card form-stack" action="/app/campaigns/cmp-emberfall" method="get">
          <h2>Campaign details</h2>
          <label className="field">
            <span>Name</span>
            <input className="input focus-ring" name="name" defaultValue="Emberfall Frontier" />
          </label>
          <label className="field">
            <span>Game system</span>
            <input className="input focus-ring" name="system" defaultValue="D&D 5e" />
          </label>
          <label className="field">
            <span>What makes this campaign useful to prep?</span>
            <textarea
              className="input focus-ring"
              name="pitch"
              rows={5}
              defaultValue="A compact frontier campaign with faction pressure, travel danger, and recurring NPCs."
            />
          </label>
          <button className="button button-primary focus-ring" type="submit">
            Create preview campaign
          </button>
        </form>

        <div className="card">
          <h2>What gets created first</h2>
          <ul className="list">
            <li className="list-item">
              <strong>Campaign overview</strong>
              <p>Next session, unresolved hooks, recent notes, and quick actions.</p>
            </li>
            <li className="list-item">
              <strong>Session list</strong>
              <p>Prep status and direct access to the current prep workspace.</p>
            </li>
            <li className="list-item">
              <strong>World tracker</strong>
              <p>NPC, location, faction, and item tabs in a single route.</p>
            </li>
          </ul>
          <Link className="button button-secondary focus-ring" href="/app">
            Back to dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
