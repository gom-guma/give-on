"use client";

import { useAdminDeliveriesQuery } from "@give-on/api";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@give-on/ui";

import { AdminDeliveryTable } from "@/components/admin-delivery-table";
import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminStatus } from "@/components/admin-status";

export function AdminDeliveriesPageView() {
  const deliveriesQuery = useAdminDeliveriesQuery();

  if (deliveriesQuery.isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">배송 데이터를 불러오는 중입니다.</p>;
  }

  if (deliveriesQuery.isError || !deliveriesQuery.data) {
    return <p className="text-sm text-[var(--destructive)]">배송 데이터를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <AdminPageHeader
        eyebrow="Delivery management"
        title="배송 관리"
        description="기부 완료 이후 배송 준비, 배송중, 도착확인, 지연 상태를 한 화면에서 추적합니다."
        primaryAction="배송 CSV"
        secondaryAction="지연 건만 보기"
      />

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["기부완료", "slate"],
          ["배송준비", "amber"],
          ["배송중", "green"],
          ["지연", "red"]
        ].map(([status, tone]) => {
          const count = deliveriesQuery.data.filter((item) => item.status === status).length;

          return (
            <div
              key={status}
              className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                {status}
              </p>
              <p
                className={`mt-3 text-3xl font-semibold ${
                  tone === "red"
                    ? "text-[var(--destructive)]"
                    : tone === "amber"
                      ? "text-[var(--warning)]"
                      : tone === "green"
                        ? "text-[var(--primary)]"
                        : "text-[var(--foreground)]"
                }`}
              >
                {count}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card>
          <CardHeader className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <CardTitle>배송 상태 파이프라인</CardTitle>
            <CardDescription>지연 이슈는 별도 라벨로 강조해 운영자가 빠르게 대응할 수 있게 합니다.</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <AdminDeliveryTable data={deliveriesQuery.data} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfa_100%)]">
            <CardTitle>지연/주의 알림</CardTitle>
            <CardDescription>택배 지연과 출고 준비 건을 오른쪽에서 빠르게 정리합니다.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {deliveriesQuery.data
              .filter((item) => item.status === "지연" || item.status === "배송준비")
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{item.orderNumber}</p>
                    <AdminStatus tone={item.status} />
                  </div>
                  <p className="mt-2 text-sm text-[var(--foreground)]">{item.campaignTitle}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{item.region}</p>
                  {item.issueLabel ? (
                    <p className="mt-3 text-xs font-medium text-[var(--destructive)]">{item.issueLabel}</p>
                  ) : null}
                </div>
              ))}
            <Button variant="outline" className="rounded-full">
              송장 동기화
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
