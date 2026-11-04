import type { Entity, Scope } from '@/types/entity';
import { initialData } from '@/mocks/seed';
type Database = Record<string, Entity[]>;
const STORAGE_KEY = 'careos.database.v2';
let cache: Database | undefined;
export function readDatabase(): Database {
  if (cache) return cache;
  if (typeof window === 'undefined') throw new Error('The mock database is browser-only.');
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data: unknown = JSON.parse(stored);
      if (data && typeof data === 'object' && Object.values(data).every(Array.isArray)) {
        cache = data as Database;
        return cache;
      }
    } catch {
      /* recover fictional demo data */
    }
  }
  cache = structuredClone(initialData);
  return cache;
}
export function transaction<T>(operation: (draft: Database) => T): T {
  const draft = structuredClone(readDatabase());
  const result = operation(draft);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    throw new Error('Demo data could not be saved. Browser storage may be full or unavailable.');
  }
  cache = draft;
  return result;
}
export function inScope(row: Entity, scope: Scope) {
  return (
    (row.organizationId === scope.organizationId || row.organizationId === 'platform') &&
    (!scope.branchId || row.branchId === scope.branchId) &&
    (!scope.patientId || row.patient === scope.patientId || row.id === scope.patientId)
  );
}
export function resetDatabase() {
  window.localStorage.removeItem(STORAGE_KEY);
  cache = undefined;
}
