"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/application/auth/auth-client";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      basePath="/auth"
      credentials
      navigate={(href) => router.push(href)}
      replace={(href) => router.replace(href)}
      signUp
      Link={Link}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
