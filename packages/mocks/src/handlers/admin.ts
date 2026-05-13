import { http, HttpResponse } from "msw";

import {
  adminCampaignDetailsFixture,
  adminCampaignQueueFixture,
  adminDashboardFixture,
  adminDeliveriesFixture
} from "../fixtures/admin";

export const adminHandlers = [
  http.get("http://localhost/api/admin/dashboard", () => {
    return HttpResponse.json(adminDashboardFixture);
  }),
  http.get("http://localhost/api/admin/campaigns", () => {
    return HttpResponse.json(adminCampaignQueueFixture);
  }),
  http.get("http://localhost/api/admin/campaigns/:id", ({ params }) => {
    const campaign = adminCampaignDetailsFixture.find((item) => item.id === params.id);

    if (!campaign) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(campaign);
  }),
  http.get("http://localhost/api/admin/deliveries", () => {
    return HttpResponse.json(adminDeliveriesFixture);
  })
];
