import { AppShell } from "@/features/app-shell/app-shell";
import { loadAppShell } from "@/features/app-shell/server/load-app-shell";

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const { campaigns, user } = await loadAppShell();

  return (
    <AppShell campaigns={campaigns} user={user}>
      {children}
    </AppShell>
  );
}
