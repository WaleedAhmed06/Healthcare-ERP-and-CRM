'use client';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Entity } from '@/types/entity';
import { useWorkflow } from '@/features/workflows/hooks/use-workflow';
import type { WorkflowAction } from '@/features/workflows/services/workflow.service';
export function RecordActions({
  resource,
  record,
  readOnly,
  onEdit,
  onView,
  onDelete,
  onPay,
  onRefund,
}: {
  resource: string;
  record: Entity;
  readOnly: boolean;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
  onPay: () => void;
  onRefund: () => void;
}) {
  const workflow = useWorkflow(resource);
  const actions: { label: string; action: WorkflowAction }[] = [];
  if (
    resource === 'appointments' &&
    !['Completed', 'Cancelled', 'No Show'].includes(String(record.status))
  )
    actions.push({
      label:
        record.status === 'Waiting'
          ? 'Call patient'
          : record.status === 'In Consultation'
            ? 'Complete visit'
            : 'Check in',
      action:
        record.status === 'Waiting'
          ? 'call'
          : record.status === 'In Consultation'
            ? 'complete'
            : 'check-in',
    });
  if (resource === 'laboratory' && record.status !== 'Approved')
    actions.push({ label: 'Advance lab status', action: 'lab-next' });
  if (['plans', 'aesthetic', 'physiotherapy'].includes(resource))
    actions.push({ label: 'Complete session', action: 'session' });
  if (resource === 'admissions' && record.status !== 'Discharged')
    actions.push({ label: 'Discharge patient', action: 'discharge' });
  if (['inventory', 'pharmacy'].includes(resource))
    actions.push(
      { label: 'Stock in +10', action: 'stock-in' },
      { label: 'Stock out −1', action: 'stock-out' },
    );
  if (['consultations', 'dental', 'aesthetic', 'admissions', 'plans'].includes(resource))
    actions.push({ label: 'Generate invoice', action: 'invoice' });
  if (resource === 'consultations')
    actions.push(
      { label: 'Complete consultation', action: 'complete' },
      { label: 'Create CBC lab order', action: 'lab-order' },
    );
  return (
    <>
      <Button size="icon" variant="ghost" aria-label="View record" onClick={onView}>
        <Eye className="size-3.5" />
      </Button>
      {resource === 'invoices' && (
        <Button size="sm" variant="outline" onClick={onPay}>
          Pay
        </Button>
      )}
      {!readOnly && (
        <>
          <Button size="icon" variant="ghost" aria-label="Edit record" onClick={onEdit}>
            <Pencil className="size-3.5" />
          </Button>
          {actions.length > 0 && (
            <select
              aria-label="Workflow actions"
              className="max-w-28 rounded-md border bg-white px-1 text-[11px]"
              value=""
              disabled={workflow.isPending}
              onChange={(e) => {
                const action = e.target.value as WorkflowAction;
                if (action) workflow.mutate({ id: record.id, action });
              }}
            >
              <option value="">Actions</option>
              {actions.map((a) => (
                <option key={a.action} value={a.action}>
                  {a.label}
                </option>
              ))}
            </select>
          )}
          {resource === 'invoices' && Number(record.paid) > 0 && (
            <Button size="sm" variant="ghost" onClick={onRefund}>
              Refund
            </Button>
          )}
          <Button size="icon" variant="ghost" aria-label="Delete record" onClick={onDelete}>
            <Trash2 className="size-3.5 text-muted-foreground" />
          </Button>
        </>
      )}
    </>
  );
}
