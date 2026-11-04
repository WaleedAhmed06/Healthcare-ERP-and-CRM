'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRelations } from '@/hooks/use-relations';
import { useEntities } from '@/hooks/use-entities';
import { featureByKey } from '@/config/features';
import type { Entity } from '@/types/entity';
import type { FeatureDefinition } from '@/types/module';
import { money } from '@/lib/format';
import { invoiceTotal, invoiceBalance } from '@/features/invoices/services/invoice-calculations';
import { StatusBadge } from '@/components/shared/status-badge';
export function RecordDetail({
  definition,
  record,
  onClose,
}: {
  definition: FeatureDefinition;
  record: Entity;
  onClose: () => void;
}) {
  const relatedKeys =
    definition.key === 'patients'
      ? [
          'appointments',
          'consultations',
          'prescriptions',
          'laboratory',
          'plans',
          'invoices',
          'documents',
          'dental',
          'aesthetic',
        ]
      : definition.fields.flatMap((f) => (f.relation ? [f.relation] : []));
  const relations = useRelations(relatedKeys);
  const payments = useEntities('payments');
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="print-sheet max-h-[90dvh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {String(record.name || definition.title)}{' '}
            <span className="ml-2 text-xs font-normal text-muted-foreground">{record.id}</span>
          </DialogTitle>
          <DialogDescription>Fictional demonstration record · {definition.title}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {definition.fields.map((f) => (
            <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {f.label}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm">
                {String(
                  f.relation
                    ? relations[f.relation]?.find((r) => r.id === record[f.key])?.name ||
                        record[f.key] ||
                        '—'
                    : (record[f.key] ?? '—'),
                )}
              </p>
            </div>
          ))}
        </div>
        {definition.key === 'invoices' && (
          <>
            <div className="flex flex-wrap justify-between gap-4 rounded-xl bg-muted p-4 text-sm">
              <span>
                Total <strong>{money(invoiceTotal(record))}</strong>
              </span>
              <span>
                Paid <strong>{money(Number(record.paid || 0))}</strong>
              </span>
              <span>
                Balance <strong>{money(invoiceBalance(record))}</strong>
              </span>
            </div>
            <h3 className="mt-3 text-sm font-medium">Payment history</h3>
            {payments.records
              .filter((p) => p.invoice === record.id)
              .map((p) => (
                <div key={p.id} className="flex justify-between gap-2 border-b py-2 text-xs">
                  <span>
                    {p.id} · {String(p.method)}
                  </span>
                  <span>{money(Number(p.amount))}</span>
                  <StatusBadge value={p.status} />
                </div>
              ))}
          </>
        )}
        {definition.key === 'patients' && (
          <div className="space-y-5 border-t pt-4">
            {relatedKeys.map((key) => {
              const rows = relations[key]?.filter((r) => r.patient === record.id) || [];
              if (!rows.length) return null;
              return (
                <section key={key}>
                  <h3 className="mb-2 text-sm font-medium">
                    {featureByKey[key]?.title}{' '}
                    <span className="text-muted-foreground">({rows.length})</span>
                  </h3>
                  {rows.slice(0, 8).map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-wrap items-center justify-between gap-2 border-b py-2 text-xs"
                    >
                      <span>
                        {String(row.date || row.createdAt).slice(0, 10)} ·{' '}
                        {String(
                          row.complaint ||
                            row.test ||
                            row.medication ||
                            row.name ||
                            row.procedure ||
                            row.items ||
                            row.id,
                        )}
                      </span>
                      <StatusBadge value={row.status || 'Recorded'} />
                    </div>
                  ))}
                </section>
              );
            })}
          </div>
        )}
        <div className="flex justify-end border-t pt-4">
          <Button variant="outline" onClick={() => window.print()}>
            Print / Save PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
