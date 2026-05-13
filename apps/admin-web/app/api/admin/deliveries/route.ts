import { NextResponse } from "next/server";

import { getMockAdminDeliveries } from "@give-on/mocks";

export async function GET() {
  return NextResponse.json(getMockAdminDeliveries());
}
