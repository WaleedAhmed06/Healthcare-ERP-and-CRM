import { Badge } from '@/components/ui/badge';
export function StatusBadge({ value }: { value: unknown }) {
  const text = String(value || 'Active');
  const good = /completed|approved|paid|active|available|confirmed|succeeded/i.test(text);
  const bad = /cancel|reject|inactive|no show|immediate|declined/i.test(text);
  return (
    <Badge
      variant="secondary"
      className={
        good
          ? 'border-0 bg-emerald-50 text-emerald-700'
          : bad
            ? 'border-0 bg-red-50 text-red-700'
            : 'border-0 bg-amber-50 text-amber-800'
      }
    >
      <span className="mr-1 text-[8px]">●</span>
      {text}
    </Badge>
  );
}
