import { createRepository } from '@/services/repository-factory';
import type { Admissions } from '../types/admissions.types';
import type { EntityInput, Scope } from '@/types/entity';
import { transaction, inScope } from '@/services/mock/mock-database';
const repository = createRepository<Admissions>('admissions');
function save(input: EntityInput, scope: Scope, id?: string) {
  return transaction((db) => {
    const previous = id ? db.admissions.find((a) => a.id === id && inScope(a, scope)) : undefined;
    if (id && !previous) throw new Error('Admission not found.');
    const status = input.status || previous?.status || 'Admitted';
    const bedName = input.bed || previous?.bed;
    const bed = db.beds.find(
      (b) => b.organizationId === scope.organizationId && b.name === bedName,
    );
    if (
      status === 'Admitted' &&
      (!bed || (bed.status !== 'Available' && previous?.bed !== bedName))
    )
      throw new Error('Select an available bed from the bed board.');
    if (previous?.bed && previous.bed !== bedName)
      db.beds
        .filter((b) => b.organizationId === scope.organizationId && b.name === previous.bed)
        .forEach((b) => (b.status = 'Available'));
    if (bed) bed.status = status === 'Discharged' ? 'Available' : 'Occupied';
    const now = new Date().toISOString();
    const row = {
      ...previous,
      ...input,
      id: id || 'ADM-' + crypto.randomUUID().slice(0, 8),
      organizationId: scope.organizationId,
      branchId: scope.branchId || previous?.branchId || 'main',
      createdAt: previous?.createdAt || now,
      updatedAt: now,
    } as Admissions;
    if (previous) db.admissions[db.admissions.indexOf(previous)] = row;
    else db.admissions.unshift(row);
    return structuredClone(row);
  });
}
export const admissionsService = {
  list: repository.list.bind(repository),
  get: repository.get.bind(repository),
  async remove(id: string, scope: Scope) {
    const current = await repository.get(id, scope);
    if (current?.status === 'Admitted')
      throw new Error('Discharge the patient before removing an admission.');
    return repository.remove(id, scope);
  },
  async create(input: EntityInput, scope: Scope) {
    return process.env.NEXT_PUBLIC_DATA_SOURCE === 'api'
      ? repository.create(input, scope)
      : save(input, scope);
  },
  async update(id: string, input: EntityInput, scope: Scope) {
    return process.env.NEXT_PUBLIC_DATA_SOURCE === 'api'
      ? repository.update(id, input, scope)
      : save(input, scope, id);
  },
};
