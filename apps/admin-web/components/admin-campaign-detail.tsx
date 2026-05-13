"use client";

import Link from "next/link";

import { useAdminCampaignDetailQuery } from "@give-on/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@give-on/ui";

import { AdminStatus } from "@/components/admin-status";

type AdminCampaignDetailProps = {
  id: string;
};

export function AdminCampaignDetail({ id }: AdminCampaignDetailProps) {
  const { data, isLoading, isError } = useAdminCampaignDetailQuery(id);

  if (isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">승인 상세를 불러오는 중입니다.</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-[var(--destructive)]">승인 상세를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="gap-4 border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <div className="flex flex-wrap items-center gap-2">
              <AdminStatus tone={data.urgencyLevel} />
              <AdminStatus tone={data.reviewStatus} />
              <Badge variant="neutral">{data.region}</Badge>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">{data.title}</CardTitle>
              <CardDescription>
                {data.farmerName} 농가 · {data.produceType} · 긴급도 점수 {data.urgencyScore.toFixed(1)}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[linear-gradient(180deg,#224230_0%,#506a52_100%)] p-4">
                <div className="h-[320px] rounded-[calc(var(--radius-xl)-4px)] bg-[radial-gradient(circle_at_top_right,#5c7e60_0%,#264735_52%,#1d3428_100%)] p-5">
                  <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5">
                    <div className="flex items-center justify-between text-white/80">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em]">Campaign hero</p>
                      <p className="text-xs">Mock Produce</p>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-full bg-[linear-gradient(180deg,#d97b51_0%,#9f3e2e_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.16)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--secondary)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                    제출 시각
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{data.submittedAt}</p>
                </div>
                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--secondary)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                    공개 보상
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--foreground)]">{data.rewardLabel}</p>
                </div>
                <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--secondary)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                    농가 연락처
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--foreground)]">{data.contactPhone}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[var(--radius-lg)] bg-[var(--secondary)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  요청 금액
                </p>
                <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                  {data.requestedAmount.toLocaleString()}원
                </p>
              </div>
              <div className="rounded-[var(--radius-lg)] bg-[var(--secondary)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  답례품
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  {data.rewardLabel}
                </p>
              </div>
              <div className="rounded-[var(--radius-lg)] bg-[var(--secondary)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  출고 가능 박스
                </p>
                <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                  {data.boxQuantity}개
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <CardTitle>Claude 생성 스토리 초안</CardTitle>
            <CardDescription>심사 전 공개 문구와 데이터 정합성을 함께 검토합니다.</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-sm leading-7 text-[var(--secondary-foreground)]">{data.story}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <CardTitle>기후 신호 요약</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 p-5 md:grid-cols-3">
            {data.climateSignals.map((signal) => (
              <div key={signal} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)] p-4">
                <p className="text-sm font-medium text-[var(--foreground)]">{signal}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden xl:sticky xl:top-28">
          <div className="h-20 bg-[linear-gradient(135deg,#eef7f3_0%,#f7f8fa_100%)]" />
          <CardHeader className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <CardTitle>승인 체크리스트</CardTitle>
            <CardDescription>운영자가 빠르게 확인해야 할 핵심 항목입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {data.reviewChecklist.map((item) => (
              <div key={item} className="rounded-[var(--radius-lg)] border border-[var(--border)] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full border border-[var(--sidebar-accent)] bg-[var(--primary-soft)]" />
                  <p className="text-sm text-[var(--foreground)]">{item}</p>
                </div>
              </div>
            ))}
            <div className="rounded-[var(--radius-lg)] bg-[var(--secondary)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                농가 연락처
              </p>
              <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{data.contactPhone}</p>
            </div>
          </CardContent>
          <CardContent className="flex flex-col gap-3 p-5 pt-0">
            <Button size="lg">승인하기</Button>
            <Button variant="outline" size="lg">
              반려하기
            </Button>
            <Button asChild variant="ghost">
              <Link href="/campaigns">목록으로 돌아가기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
