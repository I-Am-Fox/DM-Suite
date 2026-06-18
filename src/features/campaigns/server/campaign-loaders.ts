import "server-only";

import { notFound } from "next/navigation";

import { requireCurrentUser } from "@/application/auth/session";
import { dmSuiteService } from "@/application/dm-suite/dm-suite-service";
import type { WorldEntityKind } from "@/domain/dm-suite/types";

export const worldEntityKinds: WorldEntityKind[] = ["npc", "location", "faction", "item"];

export function resolveWorldEntityKind(value?: string): WorldEntityKind {
  return worldEntityKinds.includes(value as WorldEntityKind)
    ? (value as WorldEntityKind)
    : "npc";
}

export async function loadCampaignWorkspace(campaignId: string) {
  const user = await requireCurrentUser();
  const workspace = await dmSuiteService.getCampaignWorkspace(user.id, campaignId);

  if (!workspace) {
    notFound();
  }

  return workspace;
}

export async function loadCampaign(campaignId: string) {
  const user = await requireCurrentUser();
  const campaign = await dmSuiteService.getCampaignForUser(user.id, campaignId);

  if (!campaign) {
    notFound();
  }

  return {
    campaign,
    user
  };
}

export async function loadCampaignSessions(campaignId: string) {
  const { campaign, user } = await loadCampaign(campaignId);
  const sessions = await dmSuiteService.listSessionsForCampaign(user.id, campaign.id);

  return {
    campaign,
    sessions
  };
}

export async function loadSessionPrepWorkspace(campaignId: string, sessionId: string) {
  const user = await requireCurrentUser();
  const workspace = await dmSuiteService.getSessionWorkspace(user.id, campaignId, sessionId);

  if (!workspace) {
    notFound();
  }

  return workspace;
}

export async function loadWorldTracker(campaignId: string, tab?: string) {
  const { campaign, user } = await loadCampaign(campaignId);
  const activeTab = resolveWorldEntityKind(tab);
  const entities = await dmSuiteService.listWorldEntities(user.id, campaign.id, activeTab);

  return {
    activeTab,
    campaign,
    entities
  };
}

export async function loadTimeline(campaignId: string) {
  const { campaign, user } = await loadCampaign(campaignId);
  const events = await dmSuiteService.listTimelineEvents(user.id, campaign.id);

  return {
    campaign,
    events
  };
}

export async function loadExportCenter(campaignId: string) {
  const { campaign, user } = await loadCampaign(campaignId);
  const exportRequests = await dmSuiteService.listExportRequests(user.id, campaign.id);

  return {
    campaign,
    exportRequests
  };
}
