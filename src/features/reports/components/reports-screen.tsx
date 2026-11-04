'use client';
import { useState } from 'react';
import { Download, Wallet, Receipt, TrendingUp, Users } from 'lucide-react';
import { useDashboard } from '@/features/dashboard/hooks/use-dashboard';
import { RevenueChart } from '@/features/dashboard/components/revenue-chart';
import { MetricCard } from '@/features/dashboard/components/metric-card';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { exportCsv } from '@/services/export/csv.service';
import { invoiceTotal, invoiceBalance } from '@/features/invoices/services/invoice-calculations';
import { money } from '@/lib/format';
export function ReportsScreen() {
  const data = useDashboard();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState('Financial');
  const invoices = data.invoices.filter(
    (i) => (!from || String(i.date) >= from) && (!to || String(i.date) <= to),
  );
  const rows =
    type === 'Patients'
      ? data.patients
      : type === 'Appointments'
        ? data.appointments
        : type === 'Inventory'
          ? data.inventory
          : type === 'Laboratory'
            ? data.laboratory
            : invoices;
  return (
    <>
      <PageHeader
        title="Reports & analytics"
        description="Understand the numbers behind your practice."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              Print / Save PDF
            </Button>
            <Button onClick={() => exportCsv(type.toLowerCase() + '-report', rows)}>
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
        }
      />
      <div className="mb-5 flex flex-wrap gap-3 rounded-xl border bg-white p-4">
        <label className="text-xs">
          Report
          <select
            className="ml-2 rounded-md border p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {['Financial', 'Patients', 'Appointments', 'Inventory', 'Laboratory'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="text-xs">
          From
          <input
            className="ml-2 rounded-md border p-2"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label className="text-xs">
          To
          <input
            className="ml-2 rounded-md border p-2"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Invoiced"
          value={money(invoices.reduce((s, r) => s + invoiceTotal(r), 0))}
          detail="Selected invoice date range"
          icon={Receipt}
        />
        <MetricCard
          label="Outstanding"
          value={money(invoices.reduce((s, r) => s + invoiceBalance(r), 0))}
          detail="Selected invoice date range"
          icon={Wallet}
        />
        <MetricCard
          label="Net collections"
          value={money(data.revenue - data.expenses)}
          detail="Today’s collections less all recorded expenses"
          icon={TrendingUp}
        />
        <MetricCard
          label="Patients"
          value={data.patients.length}
          detail="Current organization and branch"
          icon={Users}
        />
      </div>
      <section className="mb-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-sm font-medium">Collections · Last seven days</h2>
        <RevenueChart payments={data.payments} />
      </section>
      <DataTable
        rows={rows}
        columns={
          type === 'Financial'
            ? [
                { key: 'id', label: 'Invoice' },
                { key: 'date', label: 'Date' },
                { key: 'items', label: 'Services' },
                { key: 'total', label: 'Total', render: (r) => money(invoiceTotal(r)) },
                { key: 'paid', label: 'Paid', render: (r) => money(Number(r.paid || 0)) },
                { key: 'balance', label: 'Outstanding', render: (r) => money(invoiceBalance(r)) },
              ]
            : [
                { key: 'id', label: 'Reference' },
                {
                  key: 'name',
                  label: 'Name',
                  render: (r) => String(r.name || r.patient || r.test || '—'),
                },
                { key: 'date', label: 'Date' },
                { key: 'status', label: 'Status' },
              ]
        }
      />
    </>
  );
}
