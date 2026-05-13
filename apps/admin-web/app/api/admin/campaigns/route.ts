import { NextResponse } from "next/server";

import { getMockAdminCampaignQueue } from "@give-on/mocks";

export async function GET() {
  return NextResponse.json(getMockAdminCampaignQueue());
}
