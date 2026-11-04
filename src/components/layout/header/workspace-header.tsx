'use client';
import { Menu, Bell, LogOut, Building2 } from 'lucide-react';
import { organizations } from '@/config/organizations';
import { roles, type Role } from '@/config/roles';
import { useSessionStore } from '@/stores/session-store';
import { Button } from '@/components/ui/button';
import { useEntities } from '@/hooks/use-entities';
import { toast } from 'sonner';
export function WorkspaceHeader({ onMenu }: { onMenu: () => void }) {
  const session = useSessionStore();
  const notifications = useEntities('notifications');
  return (
    <header className="sticky top-0 z-20 flex min-h-[76px] flex-wrap items-center justify-between gap-3 border-b bg-white/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" aria-label="Open navigation" onClick={onMenu}>
          <Menu className="size-5" />
        </button>
        <span className="hidden rounded-lg border p-2 text-primary sm:block">
          <Building2 className="size-4" />
        </span>
        <div>
          <select
            aria-label="Organization"
            className="max-w-[220px] bg-transparent text-[13px] font-semibold outline-none"
            value={session.organizationId}
            onChange={(e) => session.setOrganization(e.target.value)}
          >
            {organizations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
          <div>
            <select
              aria-label="Branch"
              className="bg-transparent text-[10px] text-muted-foreground"
              value={session.branchId}
              onChange={(e) => session.setBranch(e.target.value)}
            >
              <option value="all">All locations</option>
              <option value="main">Main branch</option>
              <option value="north">North branch</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <select
          aria-label="Demo role"
          className="max-w-[170px] rounded-lg border bg-background/60 px-2 py-2 text-xs"
          value={session.role}
          onChange={(e) => session.setRole(e.target.value as Role)}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          onClick={() => {
            toast.info(
              notifications.records
                .filter((n) => n.status === 'Unread')
                .map((n) => String(n.message))
                .join('\n') || 'You’re all caught up.',
            );
          }}
        >
          <Bell className="size-4" />
        </Button>
        <span className="hidden size-9 items-center justify-center rounded-full bg-secondary text-xs font-medium sm:flex">
          SA
        </span>
        <Button variant="ghost" size="icon" aria-label="Sign out" onClick={session.logout}>
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
