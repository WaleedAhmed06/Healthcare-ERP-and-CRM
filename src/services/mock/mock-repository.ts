import type { Entity, EntityInput, Scope } from '@/types/entity';
import type { Repository } from '../contracts/repository';
import { inScope, readDatabase, transaction } from './mock-database';
export class MockRepository<T extends Entity = Entity> implements Repository<T> {
  constructor(private resource: string) {}
  async list(scope: Scope) {
    return structuredClone(
      (readDatabase()[this.resource] || []).filter((row) => inScope(row, scope)),
    ) as T[];
  }
  async get(id: string, scope: Scope) {
    return (await this.list(scope)).find((row) => row.id === id);
  }
  async create(input: EntityInput, scope: Scope) {
    return transaction((db) => {
      const timestamp = new Date().toISOString();
      const row = {
        ...input,
        id: `${this.resource.slice(0, 3).toUpperCase()}-${crypto.randomUUID().slice(0, 8)}`,
        organizationId: scope.organizationId,
        branchId: scope.branchId || 'main',
        createdAt: timestamp,
        updatedAt: timestamp,
      } as T;
      (db[this.resource] ||= []).unshift(row);
      return structuredClone(row);
    });
  }
  async update(id: string, input: EntityInput, scope: Scope) {
    return transaction((db) => {
      const rows = db[this.resource] || [];
      const index = rows.findIndex((row) => row.id === id && inScope(row, scope));
      if (index < 0) throw new Error('Record unavailable in this organization.');
      rows[index] = {
        ...rows[index],
        ...input,
        id,
        organizationId: rows[index].organizationId,
        updatedAt: new Date().toISOString(),
      };
      return structuredClone(rows[index]) as T;
    });
  }
  async remove(id: string, scope: Scope) {
    transaction((db) => {
      if (!db[this.resource]?.some((row) => row.id === id && inScope(row, scope)))
        throw new Error('Record not found.');
      db[this.resource] = db[this.resource].filter(
        (row) => !(row.id === id && inScope(row, scope)),
      );
    });
  }
}
