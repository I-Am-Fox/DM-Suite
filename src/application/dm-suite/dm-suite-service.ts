import type {
  CampaignSummary,
  ExportRequest,
  PrepBlock,
  SessionSummary,
  TimelineEvent,
  WorldEntity,
  WorldEntityKind
} from "@/domain/dm-suite/types";
import { createMockDmSuiteService } from "@/infrastructure/mock/dm-suite-repository";

export type CampaignWorkspace = {
  campaign: CampaignSummary;
  sessions: SessionSummary[];
  nextSession?: SessionSummary;
};

export type SessionWorkspace = {
  campaign: CampaignSummary;
  session: SessionSummary;
  blocks: PrepBlock[];
  context: {
    npcs: WorldEntity[];
    locations: WorldEntity[];
    factions: WorldEntity[];
    items: WorldEntity[];
    unresolvedHooks: string[];
    previousRecap?: string;
    reminders: string[];
  };
};

export type DmSuiteService = {
  listCampaignsForUser(userId: string): Promise<CampaignSummary[]>;
  getCampaignForUser(userId: string, campaignId: string): Promise<CampaignSummary | null>;
  getCampaignWorkspace(userId: string, campaignId: string): Promise<CampaignWorkspace | null>;
  listSessionsForCampaign(userId: string, campaignId: string): Promise<SessionSummary[]>;
  getSessionWorkspace(
    userId: string,
    campaignId: string,
    sessionId: string
  ): Promise<SessionWorkspace | null>;
  listWorldEntities(
    userId: string,
    campaignId: string,
    kind?: WorldEntityKind
  ): Promise<WorldEntity[]>;
  listTimelineEvents(userId: string, campaignId: string): Promise<TimelineEvent[]>;
  listExportRequests(userId: string, campaignId: string): Promise<ExportRequest[]>;
};

export const dmSuiteService: DmSuiteService = createMockDmSuiteService();
