import type { Scope } from '@/types/entity';
import type { PaymentRequest } from '../types/payment.types';
import { paymentSchema } from '../schemas/payment.schema';
import { invoiceBalance } from './invoice-calculations';
import { transaction, inScope } from '@/services/mock/mock-database';
import { http } from '@/services/api/http-client';
import { today } from '@/lib/format';
export const paymentService = {
  async pay(input: PaymentRequest, scope: Scope) {
    paymentSchema.parse(input);
    if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'api')
      return http('/payments', { method: 'POST', body: JSON.stringify({ ...input, scope }) });
    return transaction((db) => {
      const previous = (db.payments || []).find(
        (r) => r.idempotencyKey === input.idempotencyKey && inScope(r, scope),
      );
      if (previous) return previous;
      const invoice = db.invoices.find((r) => r.id === input.invoiceId && inScope(r, scope));
      if (!invoice) throw new Error('Invoice not found.');
      if (input.amount > invoiceBalance(invoice))
        throw new Error('Amount exceeds the outstanding balance.');
      const timestamp = new Date().toISOString();
      const payment = {
        id: 'PAY-' + crypto.randomUUID().slice(0, 8),
        organizationId: scope.organizationId,
        branchId: invoice.branchId,
        patient: invoice.patient,
        invoice: invoice.id,
        amount: input.amount,
        method: input.method,
        date: today(),
        status: input.outcome === 'success' ? 'Succeeded' : 'Declined',
        idempotencyKey: input.idempotencyKey,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      (db.payments ||= []).unshift(payment);
      if (input.outcome === 'success') invoice.paid = Number(invoice.paid || 0) + input.amount;
      return payment;
    });
  },
  async refund(invoiceId: string, amount: number, scope: Scope) {
    if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'api')
      return http('/refunds', {
        method: 'POST',
        body: JSON.stringify({ invoiceId, amount, scope }),
      });
    return transaction((db) => {
      const invoice = db.invoices.find((r) => r.id === invoiceId && inScope(r, scope));
      if (!invoice || !Number.isFinite(amount) || amount <= 0 || amount > Number(invoice.paid || 0))
        throw new Error('Invalid refund amount.');
      invoice.paid = Number(invoice.paid) - amount;
      const timestamp = new Date().toISOString();
      (db.payments ||= []).unshift({
        id: 'REF-' + crypto.randomUUID().slice(0, 8),
        organizationId: scope.organizationId,
        branchId: invoice.branchId,
        patient: invoice.patient,
        invoice: invoice.id,
        amount: -amount,
        method: 'Refund',
        date: today(),
        status: 'Refunded',
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    });
  },
};
