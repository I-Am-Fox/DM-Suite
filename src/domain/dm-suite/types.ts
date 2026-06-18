export type PrepBlockType =
  | "scene"
  | "encounter"
  | "npc_cue"
  | "location_cue"
  | "faction_cue"
  | "secret"
  | "note"
  | "loot"
  | "todo";

export type SessionStatus = "draft" | "ready" | "played";
export type CampaignStatus = "active" | "archived";
export type WorldEntityKind = "npc" | "location" | "faction" | "item";
export type ExportFormat = "markdown" | "pdf";
export type ExportStatus = "planned" | "disabled" | "ready";

export type AppUser = {
  id: string;
  name: string;
  email: string;
};

export type CampaignSummary = {
  id: string;
  ownerId: string;
  name: string;
  pitch: string;
  system: string;
  status: CampaignStatus;
  nextSessionId: string;
  nextSessionTitle: string;
  nextSessionDate: string;
  unresolvedHooks: string[];
  recentNotes: string[];
  prepHealth: "needs-prep" | "in-progress" | "ready";
  lastUpdatedAt: string;
};

export type SessionSummary = {
  id: string;
  campaignId: string;
  title: string;
  date: string;
  status: SessionStatus;
  prepProgress: number;
  lastEditedAt: string;
  recap: string;
};

export type PrepBlock = {
  id: string;
  campaignId: string;
  sessionId: string;
  type: PrepBlockType;
  title: string;
  body: string;
  linkedEntityIds: string[];
  isComplete?: boolean;
};

export type WorldEntity = {
  id: string;
  campaignId: string;
  kind: WorldEntityKind;
  name: string;
  role: string;
  status: string;
  tags: string[];
  lastAppeared: string;
  linkedSessions: string[];
};

export type TimelineEvent = {
  id: string;
  campaignId: string;
  date: string;
  title: string;
  description: string;
  sessionId?: string;
};

export type ExportRequest = {
  id: string;
  campaignId: string;
  label: string;
  format: ExportFormat;
  status: ExportStatus;
  description: string;
};
