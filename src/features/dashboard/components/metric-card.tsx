import type { LucideIcon } from 'lucide-react';
export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <span className="rounded-lg bg-background p-2 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-4 text-[30px] leading-none font-semibold tracking-[-.05em]">{value}</p>
      <p className="mt-3 text-[10px] text-muted-foreground">{detail}</p>
    </div>
  );
}
