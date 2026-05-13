"use client";

import Link from "next/link";

import { useAdminDashboardQuery } from "@give-on/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@give-on/ui";

import { AdminCampaignQueueTable } from "@/components/admin-campaign-queue-table";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminStatCard } from "@/components/admin-stat-card";
import { AdminStatus } from "@/components/admin-status";

export function DashboardOverview() {
  const dashboardQuery = useAdminDashboardQuery();

  if (dashboardQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">관리자 데이터를 불러오는 중입니다.</p>;
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return <p className="text-sm text-[var(--destructive)]">관리자 데이터를 불러오지 못했습니다.</p>;
  }

  const dashboard = dashboardQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="운영 현황 대시보드"
        description="위험 농가와 배송 이슈를 먼저 확인하고, 승인 대기 캠페인을 한 화면에서 이어서 처리할 수 있도록 구성한 운영 시작 화면입니다."
        primaryAction="오늘 보고서"
        secondaryAction="운영 캘린더"
      />

      <section className="grid gap-4 xl:grid-cols-4">
        <AdminStatCard
          title="오늘 위험 농가"
          description="기상 위험 신호가 높은 농가 수"
          value={`${dashboard.stats.atRiskFarms}`}
          accent="red"
        />
        <AdminStatCard
          title="승인 대기 캠페인"
          description="즉시 검토가 필요한 공개 후보"
          value={`${dashboard.stats.pendingCampaigns}`}
          accent="amber"
        />
        <AdminStatCard
          title="배송 진행 건"
          description="답례품 배송이 진행 중인 주문"
          value={`${dashboard.stats.activeDeliveries}`}
          accent="green"
        />
        <AdminStatCard
          title="주간 기부액"
          description="이번 주 누적 후원금"
          value={`${Math.round(dashboard.stats.weeklyDonationAmount / 10000)}만원`}
          accent="slate"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">
        <Card className="overflow-hidden">
          <CardHeader className="gap-2 border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>위험 농가 모니터링</CardTitle>
                <CardDescription>
                  우선 대응이 필요한 농가를 지도 프리뷰와 카드 큐로 함께 확인합니다.
                </CardDescription>
              </div>
              <Badge variant="neutral">실시간 갱신</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[linear-gradient(180deg,#f2f7f2_0%,#eef4ef_100%)] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                      Risk map preview
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                      우선 대응 권역 요약
                    </p>
                  </div>
                  <Badge variant="neutral">Map Sync 예정</Badge>
                </div>
                <div className="mt-6 h-56 rounded-[var(--radius-lg)] border border-white/70 bg-[linear-gradient(180deg,#e7f1ea_0%,#edf2f3_100%)] p-4">
                  <div className="relative h-full rounded-[18px] border border-dashed border-[#c4d7ca]">
                    <div className="absolute left-[22%] top-[42%] h-3 w-3 rounded-full bg-[var(--warning)]" />
                    <div className="absolute left-[40%] top-[34%] h-3.5 w-3.5 rounded-full bg-[var(--destructive)]" />
                    <div className="absolute left-[60%] top-[57%] h-3 w-3 rounded-full bg-[var(--primary)]" />
                    <div className="absolute bottom-4 right-4 grid gap-2 rounded-[14px] bg-white/88 px-3 py-2 text-xs text-[var(--secondary-foreground)] shadow-[var(--shadow-card)]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--destructive)]" />
                        긴급
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--warning)]" />
                        주의
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                        안정
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {dashboard.riskFarms.map((farm) => (
                  <div
                    key={farm.id}
                    className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fafcf9_100%)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-[var(--foreground)]">{farm.farmName}</p>
                          <AdminStatus tone={farm.riskLevel} />
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {farm.region} · {farm.produceType}
                        </p>
                        <p className="text-sm leading-6 text-[var(--secondary-foreground)]">{farm.note}</p>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)]">{farm.updatedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="gap-2 border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
              <CardTitle>배송 알림</CardTitle>
              <CardDescription>즉시 확인이 필요한 출고 준비와 지연 건입니다.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 p-5">
              {dashboard.deliveryAlerts.map((delivery) => (
                <div
                  key={delivery.id}
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcf9_100%)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{delivery.orderNumber}</p>
                    <AdminStatus tone={delivery.status} />
                  </div>
                  <p className="mt-2 text-sm text-[var(--foreground)]">{delivery.campaignTitle}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {delivery.donorName} · {delivery.region}
                  </p>
                  {delivery.issueLabel ? (
                    <p className="mt-2 text-xs font-medium text-[var(--destructive)]">{delivery.issueLabel}</p>
                  ) : null}
                </div>
              ))}
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/deliveries">배송 관리 열기</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="gap-2 border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
              <CardTitle>승인 큐 스냅샷</CardTitle>
              <CardDescription>현재 검토가 필요한 항목만 요약합니다.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 p-5">
              {dashboard.approvalQueue.slice(0, 3).map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)] p-4 transition hover:border-[var(--sidebar-accent)] hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{campaign.title}</p>
                    <span className="text-sm font-semibold text-[var(--primary)]">
                      {campaign.urgencyScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <AdminStatus tone={campaign.urgencyLevel} />
                    <AdminStatus tone={campaign.reviewStatus} />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-3 border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)] md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle>캠페인 승인 큐</CardTitle>
            <CardDescription>긴급도 점수와 스토리 초안을 함께 검토합니다.</CardDescription>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/campaigns">전체 캠페인 보기</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-5">
          <AdminCampaignQueueTable data={dashboard.approvalQueue} />
        </CardContent>
      </Card>
    </div>
  );
}
