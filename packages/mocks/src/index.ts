import {
  adminCampaignDetailsFixture,
  adminCampaignQueueFixture,
  adminDashboardFixture,
  adminDeliveriesFixture
} from "./fixtures/admin";
import { campaignsFixture } from "./fixtures/campaigns";
import { dashboardSummaryFixture } from "./fixtures/dashboard";

export {
  adminCampaignDetailsFixture,
  adminCampaignQueueFixture,
  adminDashboardFixture,
  adminDeliveriesFixture
} from "./fixtures/admin";
export { campaignsFixture } from "./fixtures/campaigns";
export { dashboardSummaryFixture } from "./fixtures/dashboard";
export { handlers } from "./handlers";

export function getMockCampaigns() {
  return [...campaignsFixture];
}

export function getMockCampaignById(id: string) {
  return campaignsFixture.find((campaign) => campaign.id === id);
}

export function getMockAdminDashboard() {
  return adminDashboardFixture;
}

export function getMockAdminCampaignQueue() {
  return [...adminCampaignQueueFixture];
}

export function getMockAdminCampaignById(id: string) {
  return adminCampaignDetailsFixture.find((campaign) => campaign.id === id);
}

export function getMockAdminDeliveries() {
  return [...adminDeliveriesFixture];
}
