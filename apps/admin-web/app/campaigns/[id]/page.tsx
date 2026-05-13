import { AdminCampaignDetail } from "@/components/admin-campaign-detail";

type AdminCampaignDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminCampaignDetailPage({
  params
}: AdminCampaignDetailPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <AdminCampaignDetail id={id} />
    </div>
  );
}
