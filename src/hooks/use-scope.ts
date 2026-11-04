'use client';
import { useSessionStore } from '@/stores/session-store';
import type { Scope } from '@/types/entity';
import { organizations } from '@/config/organizations';
export function useScope(): Scope {
  const { organizationId, branchId, role } = useSessionStore();
  return {
    organizationId,
    ...(branchId !== 'all' ? { branchId } : {}),
    ...(role === 'Patient'
      ? { patientId: `PAT-${organizations.findIndex((o) => o.id === organizationId) + 1}001` }
      : {}),
  };
}
