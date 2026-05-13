import { NextResponse } from "next/server";

import { getMockAdminDashboard } from "@give-on/mocks";

export async function GET() {
  return NextResponse.json(getMockAdminDashboard());
}
