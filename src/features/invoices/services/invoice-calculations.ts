import type { Entity } from '@/types/entity';
export const invoiceTotal = (invoice: Entity) =>
  Math.round(
    Math.max(0, Number(invoice.subtotal || 0) - Number(invoice.discount || 0)) *
      (1 + Number(invoice.tax || 0) / 100) *
      100,
  ) / 100;
export const invoiceBalance = (invoice: Entity) =>
  Math.max(0, invoiceTotal(invoice) - Number(invoice.paid || 0));
