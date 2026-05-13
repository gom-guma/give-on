import * as React from "react";

import { cn } from "../../lib/cn";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

type AdminNavItem = {
  href: string;
  label: string;
  description?: string;
  active?: boolean;
};

type AdminSidebarShellProps = {
  brandHref?: string;
  brandLabel?: string;
  subtitle?: string;
  summaryTitle?: string;
  summaryBody?: string;
  items: AdminNavItem[];
  footerTitle?: string;
  footerBody?: string;
  className?: string;
};

type AdminTopbarShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  badgeLabel?: string;
  className?: string;
};

export function AdminSidebarShell({
  brandHref = "/dashboard",
  brandLabel = "Give On Admin",
  subtitle,
  summaryTitle,
  summaryBody,
  items,
  footerTitle,
  footerBody,
  className
}: AdminSidebarShellProps) {
  return (
    <aside
      className={cn(
        "hidden w-[252px] shrink-0 border-r border-[var(--border)] bg-[linear-gradient(180deg,var(--sidebar)_0%,#f8fbf6_100%)] xl:block",
        className
      )}
    >
      <div className="flex h-full flex-col gap-6 px-5 py-5">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white px-4 py-3 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] text-sm font-semibold text-[var(--primary)]">
              GO
            </div>
            <div className="space-y-1">
              <a
                href={brandHref}
                className="block text-base font-semibold tracking-tight text-[var(--foreground)]"
              >
                {brandLabel}
              </a>
              {subtitle ? (
                <p className="text-xs leading-5 text-[var(--muted-foreground)]">{subtitle}</p>
              ) : null}
            </div>
          </div>
        </div>

        {summaryTitle || summaryBody ? (
          <div className="rounded-[var(--radius-xl)] border border-[var(--sidebar-accent)] bg-[var(--primary-soft)] p-4">
            {summaryTitle ? (
              <p className="text-sm font-semibold text-[var(--foreground)]">{summaryTitle}</p>
            ) : null}
            {summaryBody ? (
              <p className="mt-2 text-sm leading-6 text-[var(--secondary-foreground)]">{summaryBody}</p>
            ) : null}
          </div>
        ) : null}

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "rounded-[var(--radius-lg)] border px-4 py-3 transition",
                item.active
                  ? "border-[var(--sidebar-accent)] bg-white shadow-[var(--shadow-card)]"
                  : "border-transparent bg-transparent hover:border-[var(--border)] hover:bg-white"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    item.active ? "text-[var(--foreground)]" : "text-[var(--sidebar-foreground)]"
                  )}
                >
                  {item.label}
                </span>
                {item.active ? <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" /> : null}
              </div>
              {item.description ? (
                <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              ) : null}
            </a>
          ))}
        </nav>

        {(footerTitle || footerBody) && (
          <div className="mt-auto space-y-3">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-white p-4 shadow-[var(--shadow-card)]">
              {footerTitle ? (
                <p className="text-sm font-semibold text-[var(--foreground)]">{footerTitle}</p>
              ) : null}
              {footerBody ? (
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{footerBody}</p>
              ) : null}
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                운영 메모
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--secondary-foreground)]">
                오전에는 승인 대기, 오후에는 배송 지연 대응 위주로 큐를 정리합니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export function AdminTopbarShell({
  eyebrow = "운영자 콘솔",
  title,
  description,
  badgeLabel = "Admin PWA",
  className
}: AdminTopbarShellProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b border-[var(--border)] bg-[#fcfdf9]/88 backdrop-blur supports-[backdrop-filter]:bg-[#fcfdf9]/76",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            {eyebrow}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <p className="text-lg font-semibold tracking-tight text-[var(--foreground)]">{title}</p>
            <Badge variant="neutral" className="hidden md:inline-flex">
              실시간 운영
            </Badge>
          </div>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</p>
        </div>
        <div className="hidden min-w-[320px] items-center gap-3 lg:flex">
          <div className="flex-1 rounded-full border border-[var(--border)] bg-white px-1 py-1 shadow-[var(--shadow-card)]">
            <Input
              readOnly
              value=""
              placeholder="캠페인, 주문번호, 농가명 검색"
              className="h-10 border-none bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <Badge variant="secondary" className="shrink-0">
            {badgeLabel}
          </Badge>
        </div>
      </div>
    </header>
  );
}
