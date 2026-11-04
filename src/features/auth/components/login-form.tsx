'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/shared/brand-logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { organizations } from '@/config/organizations';
import { roles, type Role } from '@/config/roles';
import { useSessionStore } from '@/stores/session-store';
import { loginSchema } from '../schemas/login.schema';
export function LoginForm() {
  const router = useRouter();
  const login = useSessionStore((s) => s.login);
  const [role, setRole] = useState<Role>('Facility Administrator');
  const [org, setOrg] = useState('city');
  const [error, setError] = useState('');
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[var(--sidebar)] p-14 text-white lg:flex">
        <div className="relative z-10">
          <BrandLogo onDark className="max-w-80" />
          <p className="mt-3 text-[10px] tracking-[.2em] text-white/60">
            CAREOS · HEALTHCARE ERP & CRM
          </p>
        </div>
        <div className="relative z-10 max-w-lg">
          <p className="mb-5 text-xs uppercase tracking-[.25em] text-[#e6b4a7]">
            Connected care. Clearer operations.
          </p>
          <h1 className="text-6xl leading-[1.1] font-medium tracking-[-.06em]">
            More time for
            <br />
            what matters.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/65">
            Your patients, people and practice. Together in one thoughtfully connected workspace.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-7">
            {[
              ['6', 'Organizations'],
              ['13', 'User roles'],
              ['One', 'Connected platform'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="text-3xl">{n}</p>
                <p className="mt-2 text-xs text-white/55">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/45">
          Fictional data. Real possibilities. · Slate & Coral edition
        </p>
        <div className="absolute -right-48 top-40 size-[600px] rounded-full border-[80px] border-white/[.025]" />
      </section>
      <section className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <BrandLogo className="max-w-60" />
          </div>
          <span className="rounded-full border bg-white px-3 py-1 text-[11px] text-muted-foreground">
            INTERACTIVE DEMO
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">Welcome to CareOS</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose your organization and explore your workspace.
          </p>
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const result = loginSchema.safeParse(Object.fromEntries(fd));
              if (!result.success) {
                setError(result.error.issues[0].message);
                return;
              }
              login(role, org);
              router.push('/dashboard');
            }}
          >
            <label className="block text-xs font-medium">
              Organization
              <select
                className="mt-2 h-11 w-full rounded-lg border bg-white px-3"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              >
                {organizations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium">
              Demo role
              <select
                className="mt-2 h-11 w-full rounded-lg border bg-white px-3"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium">
              Email
              <Input
                className="mt-2 h-11 bg-white"
                type="email"
                name="email"
                defaultValue="clinic@healthdemo.com"
                required
              />
            </label>
            <label className="block text-xs font-medium">
              Password
              <Input
                className="mt-2 h-11 bg-white"
                type="password"
                name="password"
                defaultValue="123456"
                required
              />
            </label>
            {error && (
              <p role="alert" className="text-xs text-destructive">
                {error}
              </p>
            )}
            <Button className="h-11 w-full">
              Open workspace
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            All demo accounts use password <code>123456</code>
          </p>
          <div className="mt-8 flex gap-3 rounded-xl border bg-white p-4 text-xs leading-5 text-muted-foreground">
            <ShieldCheck className="size-5 shrink-0 text-primary" />
            Demo only. No real patient data, medical advice or payment processing. Browser role
            switching demonstrates access patterns.
          </div>
        </div>
      </section>
    </main>
  );
}
