'use client';
import { features } from '@/config/features';
import { useSessionStore } from '@/stores/session-store';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { resetDatabase } from '@/services/mock/mock-database';
import { useQueryClient } from '@tanstack/react-query';
export function SettingsScreen() {
  const session = useSessionStore();
  const [reset, setReset] = useState(false);
  const client = useQueryClient();
  return (
    <>
      <PageHeader
        title="Make CareOS yours."
        description="Organization preferences, module access and workspace configuration."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-sm font-semibold">General preferences</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Slate & Coral · Your selected brand palette
          </p>
          <div className="my-5 flex gap-2">
            {['#263B45', '#BD5849', '#FBF6F2', '#F5DFD6'].map((c) => (
              <span key={c} className="size-10 rounded-lg border" style={{ background: c }} />
            ))}
          </div>
          <label className="mb-4 block text-xs">
            Currency
            <select
              className="mt-2 h-10 w-full rounded-lg border px-3"
              value={session.currency}
              onChange={(e) => session.setCurrency(e.target.value)}
            >
              {['PKR', 'USD', 'AED', 'GBP', 'EUR'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              localStorage.setItem(
                'careos.settings.' + session.organizationId,
                JSON.stringify(data),
              );
              toast.success('Organization preferences saved');
            }}
          >
            <label className="block text-xs">
              Time zone
              <Input className="mt-2" name="timezone" defaultValue="Asia/Karachi" />
            </label>
            <label className="block text-xs">
              Language
              <select name="language" className="mt-2 h-10 w-full rounded-lg border px-3">
                <option>English</option>
                <option>Urdu</option>
                <option>Arabic</option>
              </select>
            </label>
            <label className="block text-xs">
              Working hours
              <Input className="mt-2" name="hours" defaultValue="09:00–20:00" />
            </label>
            <label className="block text-xs">
              Holidays
              <Input className="mt-2" name="holidays" placeholder="Sundays, public holidays" />
            </label>
            <Button>Save preferences</Button>
          </form>
          <div className="mt-8 border-t pt-5">
            <h3 className="text-xs font-medium">Demo data controls</h3>
            <p className="my-2 text-xs text-muted-foreground">
              Restore fictional records in this browser.
            </p>
            <Button variant="outline" onClick={() => setReset(true)}>
              Reset demonstration data
            </Button>
          </div>
        </section>
        <section className="rounded-xl border bg-white p-6">
          <h2 className="text-sm font-semibold">Module configuration</h2>
          <p className="mt-1 mb-5 text-xs text-muted-foreground">
            Show or hide modules in this browser’s workspace navigation.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {features
              .filter((f) => f.group !== 'Platform')
              .map((f) => (
                <label
                  key={f.key}
                  className="flex items-center gap-3 rounded-lg border p-3 text-xs"
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-primary"
                    checked={session.enabledModules[f.key] !== false}
                    onChange={() => session.toggleModule(f.key)}
                  />
                  {f.title}
                </label>
              ))}
          </div>
        </section>
      </div>
      {reset && (
        <ConfirmDialog
          title="Restore all demo data?"
          description="This removes your browser’s demo changes across every organization. The original fictional records will be restored."
          onClose={() => setReset(false)}
          onConfirm={() => {
            resetDatabase();
            client.invalidateQueries();
            setReset(false);
            toast.success('Demo data restored');
          }}
        />
      )}
    </>
  );
}
