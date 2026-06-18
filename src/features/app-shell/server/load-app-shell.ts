import "server-only";

import { requireCurrentUser } from "@/application/auth/session";
import { dmSuiteService } from "@/application/dm-suite/dm-suite-service";

export async function loadAppShell() {
  const user = await requireCurrentUser();
  const campaigns = await dmSuiteService.listCampaignsForUser(user.id);

  return {
    campaigns,
    user
  };
}
