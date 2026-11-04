'use client';
import { useEntities } from '@/hooks/use-entities';
import { today } from '@/lib/format';
import { invoiceBalance, invoiceTotal } from '@/features/invoices/services/invoice-calculations';
export function useDashboard() {
  const patients = useEntities('patients');
  const appointments = useEntities('appointments');
  const invoices = useEntities('invoices');
  const payments = useEntities('payments');
  const inventory = useEntities('inventory');
  const expenses = useEntities('expenses');
  const staff = useEntities('staff');
  const laboratory = useEntities('laboratory');
  return {
    patients: patients.records,
    appointments: appointments.records,
    invoices: invoices.records,
    payments: payments.records,
    inventory: inventory.records,
    staff: staff.records,
    laboratory: laboratory.records,
    loading: patients.isLoading,
    revenue: payments.records
      .filter((p) => p.date === today() && p.status !== 'Declined')
      .reduce((s, p) => s + Number(p.amount || 0), 0),
    outstanding: invoices.records.reduce((s, i) => s + invoiceBalance(i), 0),
    billed: invoices.records.reduce((s, i) => s + invoiceTotal(i), 0),
    expenses: expenses.records.reduce((s, e) => s + Number(e.amount || 0), 0),
  };
}
