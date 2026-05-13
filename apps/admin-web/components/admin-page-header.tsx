import { Badge, Button, Input } from "@give-on/ui";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: string;
  secondaryAction?: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction
}: AdminPageHeaderProps) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fafcf8_100%)] p-6 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{eyebrow}</Badge>
            <Badge variant="neutral">Give On Admin</Badge>
          </div>
          <div className="space-y-2">
            <h1 className="text-[28px] font-semibold tracking-tight text-[var(--foreground)]">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[var(--secondary-foreground)]">
              {description}
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-[420px] gap-3">
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)] p-1">
            <Input
              readOnly
              value=""
              placeholder="농가명, 캠페인명, 주문번호 검색"
              className="h-11 border-none bg-white shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {secondaryAction ? (
              <Button variant="outline" className="h-10 rounded-full px-4">
                {secondaryAction}
              </Button>
            ) : null}
            {primaryAction ? (
              <Button className="h-10 rounded-full px-4">{primaryAction}</Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
