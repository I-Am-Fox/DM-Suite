import type { DmSuiteService } from "@/application/dm-suite/dm-suite-service";
import {
  campaigns,
  exportRequests,
  prepBlocks,
  sessions,
  timelineEvents,
  worldEntities
} from "@/infrastructure/mock/dm-suite-fixtures";
import type { CampaignSummary } from "@/domain/dm-suite/types";

const sessionReminders = [
  "Ask what the party does with the sealed crate before the ambush escalates.",
  "Bring back Nyra only if the players choose the market lead.",
  "End on the shrine door opening if pacing needs a strong break."
];

function userCanAccessCampaign(userId: string, campaign: CampaignSummary): boolean {
  return campaign.ownerId === userId && campaign.status !== "archived";
}

export function createMockDmSuiteService(): DmSuiteService {
  return {
    async listCampaignsForUser(userId) {
      return campaigns.filter((campaign) => userCanAccessCampaign(userId, campaign));
    },

    async getCampaignForUser(userId, campaignId) {
      const campaign = campaigns.find((item) => item.id === campaignId);
      if (!campaign || !userCanAccessCampaign(userId, campaign)) {
        return null;
      }

      return campaign;
    },

    async getCampaignWorkspace(userId, campaignId) {
      const campaign = await this.getCampaignForUser(userId, campaignId);
      if (!campaign) {
        return null;
      }

      const campaignSessions = sessions.filter((session) => session.campaignId === campaign.id);

      return {
        campaign,
        sessions: campaignSessions,
        nextSession: campaignSessions.find((session) => session.id === campaign.nextSessionId)
      };
    },

    async listSessionsForCampaign(userId, campaignId) {
      const campaign = await this.getCampaignForUser(userId, campaignId);
      if (!campaign) {
        return [];
      }

      return sessions.filter((session) => session.campaignId === campaign.id);
    },

    async getSessionWorkspace(userId, campaignId, sessionId) {
      const campaign = await this.getCampaignForUser(userId, campaignId);
      if (!campaign) {
        return null;
      }

      const session = sessions.find(
        (item) => item.campaignId === campaign.id && item.id === sessionId
      );

      if (!session) {
        return null;
      }

      const blocks = prepBlocks.filter(
        (block) => block.campaignId === campaign.id && block.sessionId === session.id
      );

      const entities = worldEntities.filter((entity) => entity.campaignId === campaign.id);
      const previousSession = sessions
        .filter((item) => item.campaignId === campaign.id && item.status === "played")
        .at(-1);

      return {
        campaign,
        session,
        blocks,
        context: {
          npcs: entities.filter((entity) => entity.kind === "npc"),
          locations: entities.filter((entity) => entity.kind === "location"),
          factions: entities.filter((entity) => entity.kind === "faction"),
          items: entities.filter((entity) => entity.kind === "item"),
          unresolvedHooks: campaign.unresolvedHooks,
          previousRecap: previousSession?.recap,
          reminders: sessionReminders
        }
      };
    },

    async listWorldEntities(userId, campaignId, kind) {
      const campaign = await this.getCampaignForUser(userId, campaignId);
      if (!campaign) {
        return [];
      }

      return worldEntities.filter(
        (entity) => entity.campaignId === campaign.id && (!kind || entity.kind === kind)
      );
    },

    async listTimelineEvents(userId, campaignId) {
      const campaign = await this.getCampaignForUser(userId, campaignId);
      if (!campaign) {
        return [];
      }

      return timelineEvents.filter((event) => event.campaignId === campaign.id);
    },

    async listExportRequests(userId, campaignId) {
      const campaign = await this.getCampaignForUser(userId, campaignId);
      if (!campaign) {
        return [];
      }

      return exportRequests.filter((request) => request.campaignId === campaign.id);
    }
  };
}
