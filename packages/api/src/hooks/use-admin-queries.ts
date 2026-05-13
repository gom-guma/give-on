"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getAdminCampaignDetailQueryOptions,
  getAdminCampaignsQueryOptions,
  getAdminDashboardQueryOptions,
  getAdminDeliveriesQueryOptions
} from "../queries/admin";

export function useAdminDashboardQuery() {
  return useQuery(getAdminDashboardQueryOptions());
}

export function useAdminCampaignsQuery() {
  return useQuery(getAdminCampaignsQueryOptions());
}

export function useAdminCampaignDetailQuery(id: string) {
  return useQuery(getAdminCampaignDetailQueryOptions(id));
}

export function useAdminDeliveriesQuery() {
  return useQuery(getAdminDeliveriesQueryOptions());
}
