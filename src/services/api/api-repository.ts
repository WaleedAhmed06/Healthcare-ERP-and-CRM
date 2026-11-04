import type { Entity, EntityInput, Scope } from '@/types/entity';
import type { Repository } from '../contracts/repository';
import { http } from './http-client';
export class ApiRepository<T extends Entity = Entity> implements Repository<T> {
  constructor(private resource: string) {}
  private path(scope: Scope, id?: string) {
    const params = new URLSearchParams({
      organizationId: scope.organizationId,
      ...(scope.branchId ? { branchId: scope.branchId } : {}),
      ...(scope.patientId ? { patientId: scope.patientId } : {}),
    });
    return `/${this.resource}${id ? '/' + encodeURIComponent(id) : ''}?${params}`;
  }
  list(scope: Scope) {
    return http<T[]>(this.path(scope));
  }
  get(id: string, scope: Scope) {
    return http<T>(this.path(scope, id));
  }
  create(input: EntityInput, scope: Scope) {
    return http<T>(this.path(scope), { method: 'POST', body: JSON.stringify(input) });
  }
  update(id: string, input: EntityInput, scope: Scope) {
    return http<T>(this.path(scope, id), { method: 'PATCH', body: JSON.stringify(input) });
  }
  remove(id: string, scope: Scope) {
    return http<void>(this.path(scope, id), { method: 'DELETE' });
  }
}
