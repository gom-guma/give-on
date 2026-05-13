"use client";

import type { AdminDeliveryItem } from "@give-on/schemas";

import { AdminStatus } from "@/components/admin-status";

type AdminDeliveryTableProps = {
  data: AdminDeliveryItem[];
};

export function AdminDeliveryTable({ data }: AdminDeliveryTableProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-[var(--table-head)]">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">주문번호</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">캠페인</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">기부자</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">배송지</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">상태</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">업데이트</th>
            <th className="px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">이슈</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-[var(--border)] align-top transition hover:bg-[#fbfcfd]"
            >
              <td className="px-4 py-4 font-medium text-[var(--foreground)]">{item.orderNumber}</td>
              <td className="px-4 py-4">
                <div className="min-w-[220px]">
                  <p className="font-medium text-[var(--foreground)]">{item.campaignTitle}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{item.rewardLabel}</p>
                </div>
              </td>
              <td className="px-4 py-4">{item.donorName}</td>
              <td className="px-4 py-4">{item.region}</td>
              <td className="px-4 py-4">
                <AdminStatus tone={item.status} />
              </td>
              <td className="px-4 py-4">{item.updatedAt}</td>
              <td className="px-4 py-4 text-xs">
                {item.issueLabel ? (
                  <span className="rounded-full bg-[var(--destructive-soft)] px-2.5 py-1 font-medium text-[var(--destructive)]">
                    {item.issueLabel}
                  </span>
                ) : (
                  <span className="text-[var(--muted-foreground)]">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
