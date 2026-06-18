import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params?.next ?? "/app";

  redirect(`/auth/sign-in?redirectTo=${encodeURIComponent(next)}`);
}
