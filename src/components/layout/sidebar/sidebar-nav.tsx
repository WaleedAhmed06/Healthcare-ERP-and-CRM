'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  Wallet,
  Package,
  Building2,
  Settings2,
  ChartNoAxesCombined,
  Layers,
  ChevronRight,
  PanelLeftClose,
} from 'lucide-react';
import { features } from '@/config/features';
import { canAccess } from '@/config/roles';
import { useSessionStore } from '@/stores/session-store';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/shared/brand-logo';
const icons = {
  Workspace: Users,
  Clinical: Stethoscope,
  Finance: Wallet,
  Specialties: Layers,
  Operations: Package,
  Organization: Building2,
  Platform: Building2,
};
export function SidebarNav({ onClose }: { onClose?: () => void }) {
  const path = usePathname();
  const { role, enabledModules } = useSessionStore();
  const groups = [
    'Workspace',
    'Clinical',
    'Finance',
    'Specialties',
    'Operations',
    'Organization',
    'Platform',
  ];
  const item = (key: string, title: string, Icon: typeof Users) => (
    <Link
      onClick={onClose}
      key={key}
      href={'/' + key}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors hover:bg-white/5',
        path === '/' + key
          ? 'bg-[#f5dfd6] font-medium text-[#773f34] hover:bg-[#f5dfd6]'
          : 'text-[#c0cdd2]',
      )}
    >
      <Icon className="size-[17px] shrink-0" />
      {title}
      {path === '/' + key && <ChevronRight className="ml-auto size-3" />}
    </Link>
  );
  return (
    <aside className="flex h-dvh w-60 shrink-0 flex-col bg-[var(--sidebar)] text-white">
      <div className="flex items-center gap-2.5 px-4 pt-6 pb-5">
        <BrandLogo onDark />
        {onClose && (
          <button aria-label="Close navigation" onClick={onClose} className="ml-auto lg:hidden">
            <PanelLeftClose className="size-5" />
          </button>
        )}
      </div>
      <div className="mx-5 mb-4 rounded-lg border border-white/10 px-3 py-2 text-[10px] tracking-wider text-white/55">
        HEALTHCARE WORKSPACE <span className="float-right text-[#e1af9f]">DEMO</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-8">
        {item('dashboard', 'Overview', LayoutDashboard)}
        {canAccess(role, 'queue') && item('queue', 'Live queue', CalendarDays)}
        {groups.map((group) => {
          const entries = features.filter(
            (f) => f.group === group && canAccess(role, f.key) && enabledModules[f.key] !== false,
          );
          if (!entries.length) return null;
          return (
            <div key={group}>
              <p className="px-3 pt-6 pb-2 text-[9px] font-medium uppercase tracking-[.2em] text-white/35">
                {group}
              </p>
              {entries.map((f) => item(f.key, f.title, icons[f.group]))}
            </div>
          );
        })}
        {canAccess(role, 'reports') && item('reports', 'Reports & analytics', ChartNoAxesCombined)}
        {canAccess(role, 'settings') && item('settings', 'Settings', Settings2)}
      </nav>
      <div className="border-t border-white/10 px-6 py-4">
        <p className="text-xs">Care, beautifully connected.</p>
        <p className="mt-1 text-[10px] text-white/40">CareOS · Frontend demonstration</p>
      </div>
    </aside>
  );
}
