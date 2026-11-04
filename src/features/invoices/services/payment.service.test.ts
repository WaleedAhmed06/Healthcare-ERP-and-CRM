import { beforeEach, describe, it, expect } from 'vitest';
import { paymentService } from './payment.service';
import { invoiceTotal } from './invoice-calculations';
import { readDatabase, resetDatabase } from '@/services/mock/mock-database';
const storage = new Map<string, string>();
beforeEach(() => {
  Object.defineProperty(globalThis, 'window', {
    value: {
      localStorage: {
        getItem: (k: string) => storage.get(k) || null,
        setItem: (k: string, v: string) => storage.set(k, v),
        removeItem: (k: string) => storage.delete(k),
      },
    },
    configurable: true,
  });
  resetDatabase();
});
const scope = { organizationId: 'city' };
describe('payment accounting', () => {
  it('calculates tax after discounts', () => {
    const invoice = readDatabase().invoices[0];
    expect(invoiceTotal({ ...invoice, subtotal: 1000, discount: 100, tax: 10 })).toBe(990);
  });
  it('records a partial payment exactly once', async () => {
    const invoice = readDatabase().invoices.find((i) => i.organizationId === 'city' && !i.paid)!;
    const request = {
      invoiceId: invoice.id,
      amount: 100,
      method: 'Card' as const,
      outcome: 'success' as const,
      idempotencyKey: 'same-key',
    };
    await paymentService.pay(request, scope);
    await paymentService.pay(request, scope);
    expect(readDatabase().invoices.find((i) => i.id === invoice.id)?.paid).toBe(100);
  });
  it('does not change balance on a declined gateway result', async () => {
    const invoice = readDatabase().invoices.find((i) => i.organizationId === 'city' && !i.paid)!;
    await paymentService.pay(
      {
        invoiceId: invoice.id,
        amount: 100,
        method: 'JazzCash',
        outcome: 'declined',
        idempotencyKey: 'declined',
      },
      scope,
    );
    expect(readDatabase().invoices.find((i) => i.id === invoice.id)?.paid).toBe(0);
  });
  it('rejects cross-organization payment and overpayment', async () => {
    const invoice = readDatabase().invoices.find((i) => i.organizationId === 'city' && !i.paid)!;
    await expect(
      paymentService.pay(
        {
          invoiceId: invoice.id,
          amount: 100,
          method: 'Cash',
          outcome: 'success',
          idempotencyKey: 'foreign',
        },
        { organizationId: 'elite' },
      ),
    ).rejects.toThrow('not found');
    await expect(
      paymentService.pay(
        {
          invoiceId: invoice.id,
          amount: 999999,
          method: 'Cash',
          outcome: 'success',
          idempotencyKey: 'over',
        },
        scope,
      ),
    ).rejects.toThrow('exceeds');
  });
  it('refunds without losing the ledger entry', async () => {
    const invoice = readDatabase().invoices.find(
      (i) => i.organizationId === 'city' && Number(i.paid) > 0,
    )!;
    const paid = Number(invoice.paid);
    await paymentService.refund(invoice.id, 100, scope);
    expect(readDatabase().invoices.find((i) => i.id === invoice.id)?.paid).toBe(paid - 100);
    expect(readDatabase().payments[0].amount).toBe(-100);
  });
});
