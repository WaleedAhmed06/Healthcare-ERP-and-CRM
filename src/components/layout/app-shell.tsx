'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/stores/session-store';
import { SidebarNav } from './sidebar/sidebar-nav';
import { WorkspaceHeader } from './header/workspace-header';
import { ChatbotPanel } from '@/features/chatbot/components/chatbot-panel';
import { useHydrated } from '@/hooks/use-hydrated';
export function AppShell({ children }: { children: React.ReactNode }) {
  const ready = useHydrated();
  const authenticated = useSessionStore((s) => s.authenticated);
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (ready && !authenticated) router.replace('/login');
  }, [ready, authenticated, router]);
  if (!ready || !authenticated)
    return <div className="p-12 text-sm text-muted-foreground">Opening your workspace…</div>;
  return (
    <div className="flex min-h-dvh">
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">
        <SidebarNav />
      </div>
      {mobile && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobile(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <SidebarNav onClose={() => setMobile(false)} />
          </div>
        </div>
      )}
      <div className="min-w-0 flex-1 lg:ml-60">
        <WorkspaceHeader onMenu={() => setMobile(true)} />
        <div className="border-b border-[#e9dfd7] bg-[#f7eee7] px-4 py-1.5 text-center text-[10px] text-[#8a6d60]">
          DEMONSTRATION ENVIRONMENT · Fictional patient records · Simulated payments
        </div>
        <main className="mx-auto max-w-[1600px] p-4 pb-24 md:p-8">{children}</main>
      </div>
      <ChatbotPanel />
    </div>
  );
}
