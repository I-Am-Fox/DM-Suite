import type { Metadata } from "next";

import { AuthProvider } from "@/application/auth/auth-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "DM Suite",
    template: "%s | DM Suite"
  },
  description:
    "A focused campaign and session preparation workspace for solo Dungeon Masters."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
