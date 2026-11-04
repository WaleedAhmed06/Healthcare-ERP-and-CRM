'use client';
import { useState } from 'react';
import { useEntities } from '@/hooks/use-entities';
import type { Entity } from '@/types/entity';
import { StatusBadge } from '@/components/shared/status-badge';
export function ToothChart({ records }: { records: Entity[] }) {
  const patients = useEntities('patients');
  const [patient, setPatient] = useState('');
  const [tooth, setTooth] = useState('11');
  const selected = patient || patients.records[0]?.id;
  const findings = records.filter((r) => r.patient === selected);
  const rows = [
    [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
    [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
  ];
  return (
    <section className="mb-6 rounded-xl border bg-white p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Dental chart</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Permanent dentition · FDI numbering · Select a tooth to inspect
          </p>
        </div>
        <select
          aria-label="Dental patient"
          value={selected || ''}
          onChange={(e) => setPatient(e.target.value)}
          className="max-w-60 rounded-lg border px-3 py-2 text-xs"
        >
          {patients.records.map((p) => (
            <option key={p.id} value={p.id}>
              {String(p.name)}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[550px] space-y-3">
          {rows.map((row, i) => (
            <div className="flex justify-center gap-1.5" key={i}>
              {row.map((n) => {
                const condition = findings.find((f) => String(f.tooth) === String(n))?.condition;
                return (
                  <button
                    key={n}
                    aria-pressed={tooth === String(n)}
                    onClick={() => setTooth(String(n))}
                    className={`flex h-16 w-9 flex-col items-center justify-center rounded-xl border text-xs ${tooth === String(n) ? 'border-primary bg-secondary text-primary' : condition && condition !== 'Healthy' ? 'border-amber-300 bg-amber-50' : 'border-border bg-background/50'}`}
                  >
                    <span className="mb-1 h-6 w-4 rounded-[6px_6px_9px_9px] border-2 border-current opacity-60" />
                    {n}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4 text-xs">
        <strong>Tooth {tooth}</strong>
        {findings
          .filter((f) => String(f.tooth) === tooth)
          .map((f) => (
            <span key={f.id}>
              {String(f.condition)} · {String(f.procedure)} <StatusBadge value={f.status} />
            </span>
          ))}
        {!findings.some((f) => String(f.tooth) === tooth) && (
          <span className="text-muted-foreground">
            No findings recorded. Use New record to add a finding for this tooth.
          </span>
        )}
      </div>
    </section>
  );
}
