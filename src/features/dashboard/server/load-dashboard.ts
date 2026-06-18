import "server-only";

import { requireCurrentUser } from "@/application/auth/session";
import { dmSuiteService } from "@/application/dm-suite/dm-suite-service";
import type { CampaignWorkspace } from "@/application/dm-suite/dm-suite-service";

function isCampaignWorkspace(
  workspace: CampaignWorkspace | null
): workspace is CampaignWorkspace {
  return workspace !== null;
}

export async function loadDashboard() {
  const user = await requireCurrentUser();
  const campaigns = await dmSuiteService.listCampaignsForUser(user.id);
  const workspaces = await Promise.all(
    campaigns.map((campaign) => dmSuiteService.getCampaignWorkspace(user.id, campaign.id))
  );
  const validWorkspaces = workspaces.filter(isCampaignWorkspace);
  const recentSessions = validWorkspaces.flatMap((workspace) => workspace.sessions).slice(0, 4);
  const openHookCount = campaigns.reduce(
    (count, campaign) => count + campaign.unresolvedHooks.length,
    0
  );

  return {
    campaigns,
    openHookCount,
    recentSessions,
    user
  };
}
