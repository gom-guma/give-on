export const queryKeys = {
  campaigns: {
    all: ["campaigns"] as const,
    detail: (id: string) => ["campaigns", id] as const
  },
  dashboard: {
    summary: ["dashboard", "summary"] as const
  },
  admin: {
    dashboard: ["admin", "dashboard"] as const,
    campaigns: ["admin", "campaigns"] as const,
    campaignDetail: (id: string) => ["admin", "campaigns", id] as const,
    deliveries: ["admin", "deliveries"] as const
  }
};
