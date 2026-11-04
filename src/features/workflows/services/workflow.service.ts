import type { Entity, EntityInput, Scope } from '@/types/entity';
import { transaction, inScope } from '@/services/mock/mock-database';
import { http } from '@/services/api/http-client';
import { today } from '@/lib/format';
export type WorkflowAction =
  | 'check-in'
  | 'call'
  | 'complete'
  | 'lab-next'
  | 'session'
  | 'discharge'
  | 'invoice'
  | 'lab-order'
  | 'stock-in'
  | 'stock-out';
export const workflowService = {
  async run(resource: string, id: string, action: WorkflowAction, scope: Scope) {
    if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'api')
      return http(`/workflows/${action}`, {
        method: 'POST',
        body: JSON.stringify({ resource, id, scope }),
      });
    return transaction((db) => {
      const row = db[resource]?.find((r) => r.id === id && inScope(r, scope));
      if (!row) throw new Error('Record unavailable.');
      const now = new Date().toISOString();
      const append = (key: string, input: EntityInput) => {
        const record = {
          ...input,
          id: key.slice(0, 3).toUpperCase() + '-' + crypto.randomUUID().slice(0, 8),
          organizationId: row.organizationId,
          branchId: row.branchId,
          createdAt: now,
          updatedAt: now,
        };
        (db[key] ||= []).unshift(record);
        return record;
      };
      if (action === 'check-in') {
        row.status = 'Waiting';
        row.arrival = now;
        row.token =
          'T' +
          String(
            db.appointments.filter((r) => r.organizationId === scope.organizationId && r.arrival)
              .length,
          ).padStart(3, '0');
      }
      if (action === 'call') row.status = 'In Consultation';
      if (action === 'complete') {
        row.status = 'Completed';
        if (resource === 'consultations')
          db.appointments
            .filter(
              (a) =>
                a.patient === row.patient &&
                a.organizationId === row.organizationId &&
                a.date === today() &&
                a.status === 'In Consultation',
            )
            .forEach((a) => (a.status = 'Completed'));
      }
      if (action === 'lab-next') {
        const states = ['Ordered', 'Sample Collected', 'Processing', 'Review', 'Approved'];
        const index = states.indexOf(String(row.status));
        if (index === 3 && !row.result) throw new Error('Enter fictional results before approval.');
        row.status = states[Math.min(index + 1, 4)];
      }
      if (action === 'session') {
        if (Number(row.completed || 0) >= Number(row.sessions || 0))
          throw new Error('All sessions are already completed.');
        row.completed = Number(row.completed || 0) + 1;
        row.status = Number(row.completed) >= Number(row.sessions) ? 'Completed' : 'In Progress';
      }
      if (action === 'discharge') {
        if (row.status === 'Discharged') throw new Error('Already discharged.');
        row.status = 'Discharged';
        row.discharge = today();
        db.beds
          .filter((b) => b.organizationId === row.organizationId && b.name === row.bed)
          .forEach((b) => (b.status = 'Available'));
      }
      if (action === 'invoice') {
        if (row.invoiceId)
          throw new Error('An invoice has already been generated for this record.');
        const invoice = append('invoices', {
          patient: row.patient || '',
          date: today(),
          items: String(row.name || row.procedure || row.test || resource),
          subtotal: Number(row.cost || 2500),
          discount: 0,
          tax: 0,
          paid: 0,
          sourceId: row.id,
        });
        row.invoiceId = invoice.id;
      }
      if (action === 'lab-order')
        append('laboratory', {
          patient: row.patient || row.id,
          doctor: row.doctor || '',
          date: today(),
          test: 'CBC',
          status: 'Ordered',
          priority: 'Routine',
          sampleType: 'Blood',
        });
      if (action === 'stock-in' || action === 'stock-out') {
        if (action === 'stock-out' && Number(row.stock || 0) < 1)
          throw new Error('No stock available.');
        const quantity = action === 'stock-in' ? 10 : -1;
        row.stock = Number(row.stock || 0) + quantity;
        append('movements', {
          product: row.id,
          quantity,
          date: today(),
          name: String(row.name),
          balance: row.stock,
        });
      }
      row.updatedAt = now;
      append('notifications', {
        name: 'Workflow updated',
        message: `${resource}: ${action.replaceAll('-', ' ')} completed.`,
        date: today(),
        status: 'Unread',
      });
      return structuredClone(row) as Entity;
    });
  },
};
