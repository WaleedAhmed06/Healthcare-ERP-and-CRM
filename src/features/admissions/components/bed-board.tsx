'use client';
import { BedDouble } from 'lucide-react';
import { useEntities } from '@/hooks/use-entities';
import { useSessionStore } from '@/stores/session-store';
export function BedBoard() {
  const beds = useEntities('beds');
  const role = useSessionStore((s) => s.role);
  return (
    <section className="mb-6 rounded-xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Bed availability</h2>
        <span className="text-xs text-muted-foreground">
          {beds.records.filter((b) => b.status === 'Available').length} available /{' '}
          {beds.records.length} beds
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
        {beds.records.map((b) => (
          <div
            key={b.id}
            className={`rounded-lg border p-3 ${b.status === 'Available' ? 'border-emerald-100 bg-emerald-50/60' : b.status === 'Occupied' ? 'border-primary/20 bg-secondary/40' : 'bg-muted'}`}
          >
            <BedDouble className="mb-2 size-5" />
            <p className="text-xs font-medium">
              {String(b.name)} · {String(b.ward)}
            </p>
            {role === 'Patient' ? (
              <span className="text-xs">{String(b.status)}</span>
            ) : (
              <select
                aria-label={`Bed ${b.name} status`}
                className="mt-2 w-full bg-transparent text-[10px]"
                value={String(b.status)}
                onChange={(e) =>
                  beds.update.mutate({ id: b.id, input: { status: e.target.value } })
                }
              >
                {['Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
