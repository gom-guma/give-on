import { queryOptions } from "@tanstack/react-query";

import {
  adminCampaignDetailSchema,
  adminCampaignQueueItemSchema,
  adminDashboardDataSchema,
  adminDeliveryItemSchema,
  type AdminCampaignDetail,
  type AdminCampaignQueueItem,
  type AdminDashboardData,
  type AdminDeliveryItem
} from "@give-on/schemas";

import { fetchJson } from "../http/fetch-json";
import { queryKeys } from "../query-keys";

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  const json = await fetchJson<unknown>("/api/admin/dashboard");
  return adminDashboardDataSchema.parse(json);
}

export async function fetchAdminCampaigns(): Promise<AdminCampaignQueueItem[]> {
  const json = await fetchJson<unknown>("/api/admin/campaigns");
  return adminCampaignQueueItemSchema.array().parse(json);
}

export async function fetchAdminCampaignById(id: string): Promise<AdminCampaignDetail> {
  const json = await fetchJson<unknown>(`/api/admin/campaigns/${id}`);
  return adminCampaignDetailSchema.parse(json);
}

export async function fetchAdminDeliveries(): Promise<AdminDeliveryItem[]> {
  const json = await fetchJson<unknown>("/api/admin/deliveries");
  return adminDeliveryItemSchema.array().parse(json);
}

export function getAdminDashboardQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.admin.dashboard,
    queryFn: fetchAdminDashboard
  });
}

export function getAdminCampaignsQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.admin.campaigns,
    queryFn: fetchAdminCampaigns
  });
}

export function getAdminCampaignDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: queryKeys.admin.campaignDetail(id),
    queryFn: () => fetchAdminCampaignById(id),
    enabled: Boolean(id)
  });
}

export function getAdminDeliveriesQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.admin.deliveries,
    queryFn: fetchAdminDeliveries
  });
}
