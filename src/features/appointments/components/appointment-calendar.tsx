'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelations } from '@/hooks/use-relations';
import { today } from '@/lib/format';
import type { Entity } from '@/types/entity';
export function AppointmentCalendar({ records }: { records: Entity[] }) {
  const [date, setDate] = useState(today());
  const [mode, setMode] = useState('Day');
  const [doctor, setDoctor] = useState('all');
  const related = useRelations(['patients', 'staff']);
  const filter = records.filter((r) => doctor === 'all' || r.doctor === doctor);
  const start = new Date(date + 'T12:00:00');
  const days = mode === 'Day' ? 1 : mode === 'Week' ? 7 : 35;
  const offset = mode === 'Month' ? new Date(start.getFullYear(), start.getMonth(), 1).getDay() : 0;
  const base =
    mode === 'Month' ? new Date(start.getFullYear(), start.getMonth(), 1 - offset) : start;
  const shift = (direction: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() + direction * (mode === 'Day' ? 1 : mode === 'Week' ? 7 : 30));
    setDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    );
  };
  return (
    <section className="mb-6 rounded-xl border bg-white p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-primary" />
          <h2 className="text-sm font-medium">Appointment calendar</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            aria-label="Calendar practitioner"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="max-w-40 rounded-lg border px-2 text-xs"
          >
            <option value="all">All practitioners</option>
            {related.staff.map((s) => (
              <option value={s.id} key={s.id}>
                {String(s.name)}
              </option>
            ))}
          </select>
          {['Day', 'Week', 'Month'].map((m) => (
            <Button
              key={m}
              variant={mode === m ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode(m)}
            >
              {m}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous calendar period"
            onClick={() => shift(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <input
            aria-label="Calendar date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-md border px-2 text-xs"
          />
          <Button
            variant="outline"
            size="icon"
            aria-label="Next calendar period"
            onClick={() => shift(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <div
        className={`grid gap-2 ${mode === 'Day' ? 'sm:grid-cols-3' : mode === 'Week' ? 'sm:grid-cols-4 xl:grid-cols-7' : 'grid-cols-2 sm:grid-cols-7'}`}
      >
        {Array.from({ length: days }, (_, i) => {
          const d = new Date(base);
          d.setDate(base.getDate() + i);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          const rows = filter.filter((r) => r.date === key);
          return (
            <div
              key={key}
              className={`min-h-24 rounded-lg border p-2 ${mode === 'Day' ? 'sm:col-span-3' : ''}`}
            >
              <p className="mb-2 text-[10px] text-muted-foreground">
                {d.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </p>
              <div className={mode === 'Day' ? 'grid gap-2 sm:grid-cols-3' : 'space-y-1'}>
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-md border-l-2 border-primary bg-secondary/40 px-2 py-2 text-[10px]"
                  >
                    <strong>{String(r.time)}</strong>
                    <p className="mt-1 truncate">
                      {String(related.patients.find((p) => p.id === r.patient)?.name || r.patient)}
                    </p>
                    <p className="mt-1 truncate text-muted-foreground">{String(r.status)}</p>
                  </div>
                ))}
              </div>
              {!rows.length && <p className="text-[10px] text-muted-foreground">No bookings</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
