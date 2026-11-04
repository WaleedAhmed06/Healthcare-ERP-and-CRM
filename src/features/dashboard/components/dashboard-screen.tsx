'use client';
import Link from 'next/link';
import {
  Users,
  CalendarDays,
  Wallet,
  Clock,
  ArrowUpRight,
  Plus,
  Stethoscope,
  FlaskConical,
  Package,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/status-badge';
import { MetricCard } from './metric-card';
import { RevenueChart } from './revenue-chart';
import { useDashboard } from '../hooks/use-dashboard';
import { useSessionStore } from '@/stores/session-store';
import { organizations } from '@/config/organizations';
import { money, initials, today } from '@/lib/format';
import { canAccess } from '@/config/roles';
export function DashboardScreen() {
  const data = useDashboard();
  const { role, organizationId } = useSessionStore();
  const org = organizations.find((o) => o.id === organizationId);
  const current = data.appointments.filter((a) => a.date === today());
  return (
    <>
      <PageHeader
        eyebrow={`${org?.type} · ${role}`}
        title={role === 'Patient' ? 'Your care, all together.' : 'A healthier day starts here.'}
        description={
          new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Karachi',
          }) + ' · Your facility at a glance'
        }
        action={
          canAccess(role, 'appointments') ? (
            <Button asChild>
              <Link href="/appointments">
                <Plus className="size-4" />
                New appointment
              </Link>
            </Button>
          ) : undefined
        }
      />
      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label={role === 'Patient' ? 'Your appointments' : 'Today’s appointments'}
          value={current.length}
          detail={`${current.filter((a) => a.status === 'Completed').length} completed today`}
          icon={CalendarDays}
        />
        <MetricCard
          label={role === 'Patient' ? 'Your records' : 'Registered patients'}
          value={data.patients.length}
          detail="Connected across your workspace"
          icon={Users}
        />
        <MetricCard
          label={role === 'Patient' ? 'Outstanding balance' : 'Today’s collections'}
          value={money(role === 'Patient' ? data.outstanding : data.revenue)}
          detail={
            role === 'Patient'
              ? 'Simulated payments available'
              : `${money(data.outstanding)} outstanding`
          }
          icon={Wallet}
        />
        <MetricCard
          label="Patients waiting"
          value={current.filter((a) => ['Waiting', 'Checked In'].includes(String(a.status))).length}
          detail={`${data.staff.filter((s) => s.status === 'Active').length} active team members`}
          icon={Clock}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="min-w-0 rounded-xl border bg-white p-5">
          <div className="mb-5 flex justify-between">
            <div>
              <h2 className="text-sm font-semibold">Revenue overview</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Actual simulated collections · Last seven days
              </p>
            </div>
            <span className="self-start rounded-md border px-2 py-1 text-[10px]">This week</span>
          </div>
          <p className="mb-4 text-3xl font-semibold tracking-tight">
            {money(data.revenue)}
            <span className="ml-3 text-[10px] font-normal text-muted-foreground">
              received today
            </span>
          </p>
          <RevenueChart payments={data.payments} />
        </section>
        <section className="rounded-xl border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Today’s schedule</h2>
              <p className="mt-1 text-xs text-muted-foreground">Your next patient connections</p>
            </div>
            <Link href="/appointments" className="text-xs text-primary">
              View all ↗
            </Link>
          </div>
          {current.slice(0, 5).map((a) => {
            const name = String(
              data.patients.find((p) => p.id === a.patient)?.name || 'Demo patient',
            );
            return (
              <div key={a.id} className="flex items-center gap-3 border-b py-3.5 last:border-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-[10px] font-medium text-primary">
                  {initials(name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{name}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {String(a.time)} ·{' '}
                    {String(data.staff.find((d) => d.id === a.doctor)?.name || 'Consultation')}
                  </p>
                </div>
                <StatusBadge value={a.status} />
              </div>
            );
          })}
          {!current.length && (
            <p className="py-12 text-sm text-muted-foreground">No appointments scheduled today.</p>
          )}
        </section>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          {
            title: 'Clinical workspace',
            desc: `${data.laboratory.filter((l) => l.status !== 'Approved').length} laboratory orders awaiting completion`,
            href: '/laboratory',
            icon: FlaskConical,
          },
          {
            title: 'Inventory attention',
            desc: `${data.inventory.filter((i) => Number(i.stock) < Number(i.minimum)).length} products below their reorder level`,
            href: '/inventory',
            icon: Package,
          },
          {
            title: 'Care coordination',
            desc: 'Keep patient history and follow-ups connected.',
            href: '/consultations',
            icon: Stethoscope,
          },
        ]
          .filter((c) => canAccess(role, c.href.slice(1)))
          .map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex items-start gap-4 rounded-xl border bg-white p-5"
            >
              <span className="rounded-lg bg-background p-2.5 text-primary">
                <c.icon className="size-4" />
              </span>
              <div className="flex-1">
                <h3 className="text-xs font-medium">{c.title}</h3>
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{c.desc}</p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary" />
            </Link>
          ))}
      </div>
    </>
  );
}
