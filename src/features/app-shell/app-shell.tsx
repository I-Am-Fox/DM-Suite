import Link from "next/link";

import type { AppUser, CampaignSummary } from "@/domain/dm-suite/types";

type AppShellProps = {
  user: AppUser;
  campaigns: CampaignSummary[];
  children: React.ReactNode;
};

function campaignHref(campaign: CampaignSummary, suffix = "") {
  return `/app/campaigns/${campaign.id}${suffix}`;
}

export function AppShell({ user, campaigns, children }: AppShellProps) {
  const activeCampaign = campaigns[0];

  const primaryNav = [
    { label: "Dashboard", href: "/app" },
    {
      label: "Campaign overview",
      href: activeCampaign ? campaignHref(activeCampaign) : "/app/campaigns/new"
    },
    {
      label: "Sessions",
      href: activeCampaign ? campaignHref(activeCampaign, "/sessions") : "/app/campaigns/new"
    },
    {
      label: "World",
      href: activeCampaign ? campaignHref(activeCampaign, "/world") : "/app/campaigns/new"
    },
    {
      label: "Timeline",
      href: activeCampaign ? campaignHref(activeCampaign, "/timeline") : "/app/campaigns/new"
    },
    {
      label: "Exports",
      href: activeCampaign ? campaignHref(activeCampaign, "/exports") : "/app/campaigns/new"
    },
    {
      label: "Settings",
      href: activeCampaign ? campaignHref(activeCampaign, "/settings") : "/app/campaigns/new"
    }
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar" aria-label="Application navigation">
        <Link className="brand-mark focus-ring" href="/app">
          <span className="brand-glyph" aria-hidden="true">
            DM
          </span>
          <span>DM Suite</span>
        </Link>

        <div className="campaign-switcher">
          <span className="sidebar-label">Current campaign</span>
          <strong>{activeCampaign?.name ?? "No campaign yet"}</strong>
          <span>{activeCampaign?.system ?? "Create the first campaign to begin"}</span>
        </div>

        <nav className="sidebar-section">
          <span className="sidebar-label">Workspace</span>
          {primaryNav.map((item) => (
            <Link className="nav-link focus-ring" href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="sidebar-section">
          <span className="sidebar-label">Account</span>
          <Link className="nav-link focus-ring" href="/app/account">
            Account
          </Link>
          <Link className="nav-link focus-ring" href="/auth/sign-out?redirectTo=/">
            Sign out
          </Link>
        </nav>
      </aside>

      <main className="app-content">
        <header className="topbar">
          <div className="topbar-title">
            <strong>{activeCampaign?.name ?? "DM Suite"}</strong>
            <span>{activeCampaign?.nextSessionTitle ?? "Set up your first campaign"}</span>
          </div>

          <div className="topbar-command" role="search" aria-label="Search workspace">
            <span>Search prep, hooks, NPCs...</span>
            <kbd>Ctrl K</kbd>
          </div>

          <details className="mobile-nav">
            <summary className="button button-secondary focus-ring">Navigation</summary>
            <div className="grid" style={{ marginTop: 12 }}>
              {primaryNav.map((item) => (
                <Link className="nav-link focus-ring" href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <div className="button-row">
            <Link className="button button-secondary focus-ring" href="/app/campaigns/new">
              New campaign
            </Link>
            <Link className="button button-subtle focus-ring" href="/app/account">
              {user.name}
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
