import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@give-on/ui";

type AdminStatCardProps = {
  title: string;
  description: string;
  value: string;
  accent: "green" | "amber" | "red" | "slate";
};

const accentClassMap = {
  green: "border-[var(--sidebar-accent)] from-[#f2fbf5] to-white text-[var(--primary)]",
  amber: "border-[#f3dfc5] from-[#fff9f0] to-white text-[var(--warning)]",
  red: "border-[#f2d6d7] from-[#fff6f6] to-white text-[var(--destructive)]",
  slate: "border-[var(--border)] from-[#f9faf8] to-white text-[var(--foreground)]"
} as const;

export function AdminStatCard({
  title,
  description,
  value,
  accent
}: AdminStatCardProps) {
  return (
    <Card className={`overflow-hidden border bg-gradient-to-br shadow-none ${accentClassMap[accent]}`}>
      <CardHeader className="gap-1 pb-3">
        <CardDescription className="text-[11px] font-semibold uppercase tracking-[0.12em]">
          {title}
        </CardDescription>
        <CardTitle className="text-sm text-[var(--secondary-foreground)]">{description}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-3">
          <p className="text-[34px] font-semibold tracking-tight">{value}</p>
          <div className="h-10 w-10 rounded-full bg-white/80" />
        </div>
      </CardContent>
    </Card>
  );
}
