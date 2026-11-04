'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Entity } from '@/types/entity';
export function RevenueChart({ payments }: { payments: Entity[] }) {
  const data = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    const key = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });
    return {
      day: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      revenue: payments
        .filter((p) => p.date === key && p.status !== 'Declined')
        .reduce((s, p) => s + Number(p.amount || 0), 0),
    };
  });
  return (
    <div
      className="h-60 w-full min-w-0"
      role="img"
      aria-label="Revenue received during the last seven days"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 5, top: 12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#eee7e2" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: '#7c7775' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: '#7c7775' }}
            tickFormatter={(n) => (n >= 1000 ? n / 1000 + 'k' : n)}
          />
          <Tooltip
            formatter={(v) => ['Rs. ' + Number(v).toLocaleString(), 'Revenue']}
            contentStyle={{ borderRadius: 10, borderColor: '#ece7e2', fontSize: 12 }}
          />
          <Bar dataKey="revenue" fill="#bd5849" radius={[5, 5, 0, 0]} maxBarSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
