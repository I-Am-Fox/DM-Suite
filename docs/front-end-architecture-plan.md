# DM Suite Front-End Architecture Plan

## Summary

DM Suite is planned as a greenfield Next.js and Tailwind SaaS for solo Dungeon Masters. The MVP should help a user sign in, create a campaign, prepare a session, track core campaign context, and keep an export path visible without implementing every backend system immediately.

The first activation moment is:

1. The user signs in.
2. The user creates a campaign.
3. The user creates a session.
4. The user builds a usable hybrid prep page with scenes, notes, NPC cues, locations, factions, secrets, and reminders.

## Product Defaults

- Audience: solo Dungeon Masters.
- Tenancy: personal account to campaigns.
- MVP workflow: campaign and session prep.
- Prep model: hybrid blocks, combining structured prep sections with freeform writing.
- Visual style: clean professional SaaS with subtle fantasy tabletop cues.
- AI: out of scope for MVP.
- Exports: planned as a first-class product path, implemented after the core prep workflow is usable.

## Planned Routes

### Public and Auth

- `/` - public landing page with the product promise, app preview, and auth calls to action.
- `/login` - sign-in page.
- `/signup` - sign-up page.
- `/auth/[path]` - Neon Auth UI routes, including sign-in, sign-up, callback, sign-out, forgot-password, and reset-password.
- `/api/auth/[...path]` - Neon Auth API proxy route.
- `/reset-password` - password reset flow.

### Authenticated App

- `/app` - dashboard with campaigns, recent sessions, and first-run empty state.
- `/app/onboarding` - first-run campaign creation and optional first session seed.
- `/app/account` - profile, auth settings, export, and account deletion placeholders.

### Campaigns

- `/app/campaigns/new` - create campaign.
- `/app/campaigns/[campaignId]` - campaign overview with next session, unresolved hooks, recent notes, and quick actions.
- `/app/campaigns/[campaignId]/sessions` - session list and prep status.
- `/app/campaigns/[campaignId]/sessions/[sessionId]` - primary session prep workspace.
- `/app/campaigns/[campaignId]/world` - campaign tracker with NPCs, locations, factions, and important items.
- `/app/campaigns/[campaignId]/timeline` - campaign chronology and recap trail.
- `/app/campaigns/[campaignId]/exports` - Markdown and PDF export center.
- `/app/campaigns/[campaignId]/settings` - campaign metadata, archive/delete controls, and portability settings.

Billing routes should be deferred until Stripe entitlements are implemented server-side.

## App Shell

The authenticated app should use a consistent shell:

- Left sidebar: dashboard, campaign switcher, sessions, world, timeline, exports, settings.
- Top bar: current campaign name, active session selector, search or command affordance, account menu.
- Mobile navigation: collapsible app navigation with the session prep workspace remaining usable on smaller screens.

The shell should make empty, loading, error, unauthorized, and populated states explicit.

## Session Prep Workspace

The session prep page is the core MVP screen.

Header:

- Session title
- Session date or status
- Campaign name
- Last edited timestamp
- Export and action buttons

Main canvas:

- Ordered hybrid prep blocks
- Supported early block types: `scene`, `encounter`, `npc_cue`, `location_cue`, `faction_cue`, `secret`, `note`, `loot`, and `todo`
- Quick block templates for common prep patterns

Right context panel:

- Linked NPCs, locations, factions, and unresolved hooks
- Previous recap
- Session reminders and open questions

Empty state:

- Guide the user to create the first scene or note.
- Offer fast templates instead of a blank screen.

## World Tracker

The first version should keep the world tracker in a single `/world` route with tabs instead of many separate routes.

Entity cards should support:

- Name
- Role or type
- Status
- Tags
- Last appeared
- Linked sessions

The initial tracker should cover NPCs, locations, factions, and important items.

## Timeline And Exports

The timeline should store manual campaign events and session recaps. This gives DMs continuity between sessions and creates source material for future exports.

The exports route should exist early, but export actions can be disabled or marked as planned until authenticated server-side Markdown and PDF generation exists.

## Front-End Data Boundary

During early front-end implementation, use typed view models behind a small service-like interface so mock data can be replaced by Neon Postgres without rewriting pages.

Initial view models:

- `CampaignSummary`
- `SessionSummary`
- `PrepBlock`
- `WorldEntity`
- `TimelineEvent`
- `ExportRequest`

Forms and validation schemas should stay close to feature boundaries. Client-side validation improves UX, but ownership, authorization, billing, and tenancy rules must eventually be enforced server-side.

## SaaS And Security Notes

- All app routes under `/app` require an authenticated Neon Auth session once auth is configured.
- Campaign-scoped pages must eventually load data by both `campaignId` and authenticated `userId`.
- Client-side filtering must not be used as the source of tenant isolation.
- Exports must be generated server-side and scoped to the authenticated owner.
- Storage and uploads are deferred. When added, files should use private tenant-scoped paths and signed URLs.
- Billing UI should not appear until server-side Stripe entitlements exist.
- AI UI should not appear in MVP navigation.

## What Not To Build Yet

- Player accounts
- Campaign collaboration
- Public sharing
- VTT or mapmaking tools
- Marketplace
- AI generation
- Billing UI without server-side entitlement enforcement
- Deep admin tooling

## Acceptance Scenarios

- A new user can sign up, complete onboarding, create a campaign, and land on the campaign overview.
- An empty dashboard guides the user toward creating the first campaign.
- A user can navigate from campaign overview to sessions and open a session prep workspace.
- The session prep workspace supports empty, loading, error, and populated states.
- The world tracker shows NPC, location, faction, and item tabs with useful empty states.
- Mobile and desktop layouts preserve navigation, readable prep content, and usable action buttons.
- Unauthenticated users are redirected away from `/app/*`.
- Campaign-scoped pages handle missing or unauthorized campaigns safely.
