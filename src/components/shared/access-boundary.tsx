'use client';
import { canAccess } from '@/config/roles';
import { useSessionStore } from '@/stores/session-store';
export function AccessBoundary({
  feature,
  children,
}: {
  feature: string;
  children: React.ReactNode;
}) {
  const role = useSessionStore((s) => s.role);
  if (!canAccess(role, feature))
    return (
      <p className="rounded-xl border bg-white p-8 text-sm">
        This module isn’t available to your current demo role.
      </p>
    );
  return children;
}
