'use client';
import { useQueries } from '@tanstack/react-query';
import { useScope } from './use-scope';
import { createRepository } from '@/services/repository-factory';
export function useRelations(resources: string[]) {
  const fullScope = useScope();
  const keys = Array.from(new Set(resources));
  const queries = useQueries({
    queries: keys.map((key) => {
      const scope = {
        organizationId: fullScope.organizationId,
        ...(key === 'patients' && fullScope.patientId ? { patientId: fullScope.patientId } : {}),
      };
      return { queryKey: [key, scope], queryFn: () => createRepository(key).list(scope) };
    }),
  });
  return Object.fromEntries(keys.map((key, i) => [key, queries[i].data || []]));
}
