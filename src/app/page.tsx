import Link from "next/link";

const toolkitCards = [
  {
    title: "Session prep canvas",
    body: "Stack scenes, encounters, secrets, loot, notes, and reminders into one ordered prep flow.",
    label: "Prep"
  },
  {
    title: "Campaign index",
    body: "Keep NPCs, locations, factions, and important items close to the session they matter in.",
    label: "World"
  },
  {
    title: "Hook tracker",
    body: "Carry unresolved leads forward so callbacks and consequences stay visible.",
    label: "Continuity"
  },
  {
    title: "Session timeline",
    body: "Turn recaps and campaign events into a useful chronology for future prep.",
    label: "Recaps"
  },
  {
    title: "Export path",
    body: "Keep Markdown and PDF portability visible from the start, even before generation ships.",
    label: "Portable"
  },
  {
    title: "Account-scoped workspace",
    body: "Use Neon Auth as the account boundary before campaign data moves into Neon Postgres.",
    label: "SaaS"
  }
];

const stats = [
  ["9", "Prep block types"],
  ["4", "World tracker tabs"],
  ["1", "Campaign-owned workspace"],
  ["0", "Player accounts in MVP"]
];

const sessionFeatures = [
  {
    title: "Fast at the table",
    body: "Open the next session, scan the scene order, and jump into linked context without hunting through notes."
  },
  {
    title: "Built around prep",
    body: "DM Suite is not a rules database clone. The center of gravity is the next session and the campaign context behind it."
  },
  {
    title: "Portable by design",
    body: "Exports stay in the product path so DMs can keep ownership of their prep as the backend matures."
  }
];

export default function LandingPage() {
  return (
    <div className="page-shell landing-shell">
      <nav className="public-nav toolkit-nav" aria-label="Public navigation">
        <Link className="brand-mark focus-ring" href="/">
          <span className="brand-glyph" aria-hidden="true">
            DM
          </span>
          <span>DM Suite</span>
        </Link>

        <div className="public-nav-links" aria-label="Product sections">
          <a href="#workspace">Workspace</a>
          <a href="#tools">Tools</a>
          <a href="#sessions">Sessions</a>
          <a href="#exports">Exports</a>
        </div>

        <div className="button-row">
          <Link className="button button-subtle focus-ring" href="/auth/sign-in">
            Sign in
          </Link>
          <Link
            className="button button-primary focus-ring"
            href="/auth/sign-up?redirectTo=/app/onboarding"
          >
            Start prep
          </Link>
        </div>
      </nav>

      <section className="toolkit-hero" id="workspace">
        <div className="hero-panel">
          <div className="toolkit-pill">
            D&D session prep toolkit <span>Campaign-owned notes</span>
          </div>

          <div className="hero-search" role="search" aria-label="Example command search">
            <span aria-hidden="true">Search</span>
            <strong>Find scenes, NPCs, hooks, locations...</strong>
            <kbd>Ctrl K</kbd>
          </div>

          <h1 className="hero-title">Plan the next session without losing the campaign thread.</h1>
          <p className="hero-text">
            A focused workspace for solo Dungeon Masters: session prep, linked world context,
            timeline continuity, and an export path in one fast SaaS app.
          </p>

          <div className="button-row">
            <Link
              className="button button-primary focus-ring"
              href="/auth/sign-up?redirectTo=/app/onboarding"
            >
              Create a campaign
            </Link>
            <Link className="button button-secondary focus-ring" href="/auth/sign-in?redirectTo=/app">
              Open workspace
            </Link>
          </div>
        </div>

        <div className="workspace-preview" aria-label="DM Suite session workspace preview">
          <div className="workspace-preview-top">
            <span>Emberfall Frontier</span>
            <strong>The Ash Road Ambush</strong>
            <small>68% prepared</small>
          </div>
          <div className="workspace-preview-grid">
            <div className="workspace-preview-main">
              <article>
                <span>Scene</span>
                <strong>Wagon smoke on the ridge</strong>
                <p>Open with scorched canvas, survivors, tracks, and a marked crate.</p>
              </article>
              <article>
                <span>NPC cue</span>
                <strong>Nyra Voss</strong>
                <p>Answer pressure with a practical lie, then offer a useful lead.</p>
              </article>
              <article>
                <span>Secret</span>
                <strong>The cracked ruby is a key</strong>
                <p>It warms near sealed reliquaries and authenticated temple records.</p>
              </article>
            </div>
            <aside className="workspace-preview-side">
              <strong>Linked context</strong>
              <span>NPCs</span>
              <span>Locations</span>
              <span>Factions</span>
              <span>Open hooks</span>
            </aside>
          </div>
        </div>
      </section>

      <section className="toolkit-section" id="tools">
        <div className="section-heading">
          <p className="eyebrow">Prep tools</p>
          <h2>Everything a solo DM needs before the next session.</h2>
          <p>
            The reference point is a quick, searchable toolkit, but DM Suite stays centered on
            campaign preparation instead of rules lookup.
          </p>
        </div>

        <div className="tool-card-grid">
          {toolkitCards.map((card) => (
            <article className="tool-card" key={card.title}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stat-strip" aria-label="DM Suite product stats">
        {stats.map(([value, label]) => (
          <div className="stat-tile" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="toolkit-section session-band" id="sessions">
        <div className="section-heading">
          <p className="eyebrow">Built for real prep</p>
          <h2>Less database browsing. More table-ready structure.</h2>
        </div>
        <div className="grid grid-3">
          {sessionFeatures.map((feature) => (
            <article className="session-feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="toolkit-cta" id="exports">
        <div>
          <p className="eyebrow">Export-ready path</p>
          <h2>Start with a campaign workspace. Keep your notes portable.</h2>
          <p>
            Markdown and PDF exports are not exposed as fake functionality. The route is visible,
            disabled where needed, and ready for server-side generation when the backend lands.
          </p>
        </div>
        <Link className="button button-primary focus-ring" href="/auth/sign-up?redirectTo=/app/onboarding">
          Build the first campaign
        </Link>
      </section>
    </div>
  );
}
