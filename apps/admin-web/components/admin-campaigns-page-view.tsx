"use client";

import { useAdminCampaignsQuery } from "@give-on/api";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@give-on/ui";

import { AdminCampaignQueueTable } from "@/components/admin-campaign-queue-table";
import { AdminPageHeader } from "@/components/admin-page-header";

export function AdminCampaignsPageView() {
  const campaignsQuery = useAdminCampaignsQuery();

  if (campaignsQuery.isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">캠페인 승인 큐를 불러오는 중입니다.</p>;
  }

  if (campaignsQuery.isError || !campaignsQuery.data) {
    return <p className="text-sm text-[var(--destructive)]">캠페인 승인 큐를 불러오지 못했습니다.</p>;
  }

  const pendingCount = campaignsQuery.data.filter((item) => item.reviewStatus === "승인대기").length;
  const reviewingCount = campaignsQuery.data.filter((item) => item.reviewStatus === "검토중").length;
  const urgentCount = campaignsQuery.data.filter((item) => item.urgencyLevel === "긴급").length;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <AdminPageHeader
        eyebrow="Campaign approval"
        title="캠페인 승인 관리"
        description="Claude가 생성한 스토리 초안, 긴급도 점수, 답례품 조건을 함께 보고 바로 승인 또는 반려할 수 있는 운영 화면입니다."
        primaryAction="승인 큐 내보내기"
        secondaryAction="심사 기준 보기"
      />

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            긴급 승인
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--destructive)]">{urgentCount}</p>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            승인 대기
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--foreground)]">{pendingCount}</p>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            검토중
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--warning)]">{reviewingCount}</p>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            평균 점수
          </p>
          <p className="mt-3 text-3xl font-semibold text-[var(--primary)]">
            {(
              campaignsQuery.data.reduce((sum, item) => sum + item.urgencyScore, 0) /
              campaignsQuery.data.length
            ).toFixed(1)}
          </p>
        </div>
      </section>

      <Card>
        <CardHeader className="gap-4 border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <CardTitle>승인 대기 및 검토중 목록</CardTitle>
              <CardDescription>심사 우선순위가 높은 항목부터 상세 화면으로 이동하세요.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">전체 {campaignsQuery.data.length}</Badge>
              <Badge variant="destructive">긴급 {urgentCount}</Badge>
              <Badge variant="secondary">승인대기 {pendingCount}</Badge>
              <Badge variant="warning">검토중 {reviewingCount}</Badge>
              <Button variant="outline" className="h-8 rounded-full px-3 text-xs">
                최신순
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <AdminCampaignQueueTable data={campaignsQuery.data} />
        </CardContent>
      </Card>
    </div>
  );
}
