import { z } from "zod";

export const adminRiskLevelSchema = z.enum(["안전", "주의", "위험", "긴급"]);

export const adminDeliveryStatusSchema = z.enum([
  "기부완료",
  "배송준비",
  "배송중",
  "도착확인",
  "지연"
]);

export const adminCampaignReviewStatusSchema = z.enum([
  "승인대기",
  "검토중",
  "승인완료",
  "반려"
]);

export const adminRiskFarmSchema = z.object({
  id: z.string().min(1),
  farmName: z.string().min(1),
  region: z.string().min(1),
  produceType: z.string().min(1),
  riskLevel: adminRiskLevelSchema,
  note: z.string().min(1),
  updatedAt: z.string().min(1)
});

export const adminCampaignQueueItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  region: z.string().min(1),
  farmerName: z.string().min(1),
  produceType: z.string().min(1),
  urgencyLevel: adminRiskLevelSchema,
  reviewStatus: adminCampaignReviewStatusSchema,
  urgencyScore: z.number().min(0).max(10),
  requestedAmount: z.number().int().nonnegative(),
  rewardLabel: z.string().min(1),
  submittedAt: z.string().min(1),
  summary: z.string().min(1)
});

export const adminCampaignDetailSchema = adminCampaignQueueItemSchema.extend({
  story: z.string().min(1),
  climateSignals: z.array(z.string().min(1)).min(1),
  reviewChecklist: z.array(z.string().min(1)).min(1),
  contactPhone: z.string().min(1),
  boxQuantity: z.number().int().nonnegative()
});

export const adminDeliveryItemSchema = z.object({
  id: z.string().min(1),
  orderNumber: z.string().min(1),
  campaignTitle: z.string().min(1),
  donorName: z.string().min(1),
  farmerName: z.string().min(1),
  region: z.string().min(1),
  rewardLabel: z.string().min(1),
  status: adminDeliveryStatusSchema,
  updatedAt: z.string().min(1),
  issueLabel: z.string().optional()
});

export const adminDashboardDataSchema = z.object({
  stats: z.object({
    atRiskFarms: z.number().int().nonnegative(),
    pendingCampaigns: z.number().int().nonnegative(),
    activeDeliveries: z.number().int().nonnegative(),
    weeklyDonationAmount: z.number().int().nonnegative()
  }),
  riskFarms: adminRiskFarmSchema.array(),
  approvalQueue: adminCampaignQueueItemSchema.array(),
  deliveryAlerts: adminDeliveryItemSchema.array()
});

export type AdminRiskLevel = z.infer<typeof adminRiskLevelSchema>;
export type AdminDeliveryStatus = z.infer<typeof adminDeliveryStatusSchema>;
export type AdminCampaignReviewStatus = z.infer<typeof adminCampaignReviewStatusSchema>;
export type AdminRiskFarm = z.infer<typeof adminRiskFarmSchema>;
export type AdminCampaignQueueItem = z.infer<typeof adminCampaignQueueItemSchema>;
export type AdminCampaignDetail = z.infer<typeof adminCampaignDetailSchema>;
export type AdminDeliveryItem = z.infer<typeof adminDeliveryItemSchema>;
export type AdminDashboardData = z.infer<typeof adminDashboardDataSchema>;
