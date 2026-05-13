import { NextResponse } from "next/server";

import { getMockAdminCampaignById } from "@give-on/mocks";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const campaign = getMockAdminCampaignById(id);

  if (!campaign) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(campaign);
}
