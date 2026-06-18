import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      error: "Local mock login has been removed. Use /auth/sign-in."
    },
    { status: 410 }
  );
}
