'use client';
import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/shared/data-table';
import { QueryState } from '@/components/shared/query-state';
import { EntityEditor } from '@/components/shared/forms/entity-editor';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { RecordDetail } from './record-detail';
import { RecordActions } from './record-actions';
import { StatusBadge } from '@/components/shared/status-badge';
import { PaymentDialog } from '@/features/invoices/components/payment-dialog';
import { invoiceTotal, invoiceBalance } from '@/features/invoices/services/invoice-calculations';
import { paymentService } from '@/features/invoices/services/payment.service';
import { useEntities } from '@/hooks/use-entities';
import { useRelations } from '@/hooks/use-relations';
import { useScope } from '@/hooks/use-scope';
import { useSessionStore } from '@/stores/session-store';
import { exportCsv } from '@/services/export/csv.service';
import type { Repository } from '@/services/contracts/repository';
import type { Entity } from '@/types/entity';
import type { FeatureDefinition, TableColumn } from '@/types/module';
import { money } from '@/lib/format';
import { SpecialtyPanel } from './specialty-panel';
export function EntityWorkspace({
  definition,
  repository,
}: {
  definition: FeatureDefinition;
  repository: Repository;
}) {
  const records = useEntities(definition.key, repository);
  const role = useSessionStore((s) => s.role);
  const scope = useScope();
  const client = useQueryClient();
  const readOnly = role === 'Patient';
  const [editor, setEditor] = useState<Entity | null | undefined>();
  const [view, setView] = useState<Entity>();
  const [remove, setRemove] = useState<Entity>();
  const [pay, setPay] = useState<Entity>();
  const [refund, setRefund] = useState<Entity>();
  const [refunding, setRefunding] = useState(false);
  const relations = useRelations(
    definition.fields.flatMap((f) => (f.relation ? [f.relation] : [])),
  );
  const columns: TableColumn<Entity>[] = definition.columns.map((key) => {
    const field = definition.fields.find((f) => f.key === key);
    return {
      key,
      label: field?.label || key,
      render: (row) =>
        field?.relation ? (
          <button className="font-medium" onClick={() => setView(row)}>
            {String(
              relations[field.relation!]?.find((r) => r.id === row[key])?.name || row[key] || '—',
            )}
          </button>
        ) : (
          <button onClick={() => setView(row)} className="text-left">
            {String(row[key] ?? '—')}
          </button>
        ),
    };
  });
  if (definition.key === 'invoices')
    columns.push(
      { key: 'total', label: 'Total', render: (r) => money(invoiceTotal(r)) },
      { key: 'balance', label: 'Balance', render: (r) => money(invoiceBalance(r)) },
    );
  if (definition.fields.some((f) => f.key === 'status') && !definition.columns.includes('status'))
    columns.push({
      key: 'status',
      label: 'Status',
      render: (r) => <StatusBadge value={r.status} />,
    });
  const canCreate = !readOnly || ['appointments', 'messages'].includes(definition.key);
  return (
    <>
      <PageHeader
        title={definition.title}
        description={definition.description}
        eyebrow={definition.group}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportCsv(definition.key, records.records)}>
              <Download className="size-4" />
              Export
            </Button>
            {canCreate && (
              <Button onClick={() => setEditor(null)}>
                <Plus className="size-4" />
                New record
              </Button>
            )}
          </div>
        }
      />
      <SpecialtyPanel resource={definition.key} records={records.records} />
      <QueryState
        loading={records.isLoading}
        error={records.error}
        retry={() => records.refetch()}
      />
      {!records.isLoading && !records.error && (
        <DataTable
          rows={records.records}
          columns={columns}
          onSelect={setView}
          actions={(row) => (
            <RecordActions
              resource={definition.key}
              record={row}
              readOnly={readOnly}
              onView={() => setView(row)}
              onEdit={() => setEditor(row)}
              onDelete={() => setRemove(row)}
              onPay={() => setPay(row)}
              onRefund={() => setRefund(row)}
            />
          )}
        />
      )}{' '}
      {editor !== undefined && (
        <EntityEditor
          key={editor?.id || 'new'}
          definition={definition}
          record={editor || undefined}
          onClose={() => setEditor(undefined)}
          onSave={(input) =>
            editor
              ? records.update.mutateAsync({ id: editor.id, input })
              : records.create.mutateAsync(input)
          }
        />
      )}{' '}
      {view && (
        <RecordDetail definition={definition} record={view} onClose={() => setView(undefined)} />
      )}{' '}
      {remove && (
        <ConfirmDialog
          title="Remove this record?"
          description="This removes the fictional record from this browser. Linked records are retained."
          pending={records.remove.isPending}
          onClose={() => setRemove(undefined)}
          onConfirm={async () => {
            try {
              await records.remove.mutateAsync(remove.id);
              setRemove(undefined);
            } catch {}
          }}
        />
      )}{' '}
      {pay && <PaymentDialog invoice={pay} onClose={() => setPay(undefined)} />}{' '}
      {refund && (
        <ConfirmDialog
          title={`Refund ${money(Number(refund.paid || 0))}?`}
          description="This simulates a full refund and updates the invoice balance. No money is transferred."
          pending={refunding}
          onClose={() => setRefund(undefined)}
          onConfirm={async () => {
            setRefunding(true);
            try {
              await paymentService.refund(refund.id, Number(refund.paid), scope);
              await client.invalidateQueries();
              toast.success('Demo refund recorded');
              setRefund(undefined);
            } catch (e) {
              toast.error((e as Error).message);
            } finally {
              setRefunding(false);
            }
          }}
        />
      )}
    </>
  );
}
