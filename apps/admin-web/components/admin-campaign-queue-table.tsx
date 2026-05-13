"use client";

import Link from "next/link";

import type { AdminCampaignQueueItem } from "@give-on/schemas";
import { Button } from "@give-on/ui";

import { AdminStatus } from "@/components/admin-status";

type AdminCampaignQueueTableProps = {
  data: AdminCampaignQueueItem[];
};

export function AdminCampaignQueueTable({ data }: AdminCampaignQueueTableProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-[var(--table-head)]">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">캠페인</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">지역/농가</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">위험도</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">검토 상태</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">점수</th>
            <th className="px-4 py-3 font-medium text-[var(--secondary-foreground)]" />
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-[var(--border)] align-top transition hover:bg-[#fbfcfd]"
            >
              <td className="px-4 py-4">
                <div className="min-w-[240px]">
                  <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                    {item.summary}
                  </p>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="text-[var(--foreground)]">{item.region}</p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {item.farmerName} · {item.produceType}
                </p>
              </td>
              <td className="px-4 py-4">
                <AdminStatus tone={item.urgencyLevel} />
              </td>
              <td className="px-4 py-4">
                <AdminStatus tone={item.reviewStatus} />
              </td>
              <td className="px-4 py-4 font-medium text-[var(--foreground)]">
                <div className="space-y-1">
                  <p>{item.urgencyScore.toFixed(1)}</p>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--secondary)]">
                    <div
                      className="h-full rounded-full bg-[var(--primary)]"
                      style={{ width: `${Math.min(item.urgencyScore * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/campaigns/${item.id}`}>상세 보기</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
