'use client';
import { useEntities } from '@/hooks/use-entities';
import { useRelations } from '@/hooks/use-relations';
import { useWorkflow } from '@/features/workflows/hooks/use-workflow';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/status-badge';
import { today } from '@/lib/format';
export function QueueScreen() {
  const appointments = useEntities('appointments');
  const relations = useRelations(['patients', 'staff']);
  const workflow = useWorkflow('appointments');
  const rows = appointments.records.filter(
    (a) =>
      a.date === today() && ['Waiting', 'Checked In', 'In Consultation'].includes(String(a.status)),
  );
  return (
    <>
      <PageHeader
        title="Live patient queue"
        description="Keep every arrival moving through a connected care journey."
        action={
          <Button
            onClick={() => {
              const next = rows.find((r) => r.status !== 'In Consultation');
              if (next) workflow.mutate({ id: next.id, action: 'call' });
            }}
            disabled={workflow.isPending || !rows.some((r) => r.status !== 'In Consultation')}
          >
            Call next patient
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((r, i) => (
          <article key={r.id} className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-primary">
                {String(r.token || 'T' + String(i + 1).padStart(3, '0'))}
              </span>
              <StatusBadge value={r.status} />
            </div>
            <h2 className="mt-5 font-medium">
              {String(relations.patients.find((p) => p.id === r.patient)?.name || r.patient)}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {String(relations.staff.find((p) => p.id === r.doctor)?.name || r.doctor)}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Scheduled {String(r.time)} · {String(r.department || 'General Medicine')}
            </p>
            <Button
              className="mt-5 w-full"
              variant={r.status === 'In Consultation' ? 'outline' : 'default'}
              disabled={workflow.isPending}
              onClick={() =>
                workflow.mutate({
                  id: r.id,
                  action: r.status === 'In Consultation' ? 'complete' : 'call',
                })
              }
            >
              {r.status === 'In Consultation' ? 'Complete visit' : 'Start consultation'}
            </Button>
          </article>
        ))}
      </div>
      {!rows.length && (
        <p className="rounded-xl border bg-white p-12 text-center text-sm text-muted-foreground">
          The queue is clear. Check in an appointment to add a patient.
        </p>
      )}
    </>
  );
}
