import { createRepository } from '@/services/repository-factory';
import type { Appointments } from '../types/appointments.types';
import type { EntityInput, Scope } from '@/types/entity';
const repository = createRepository<Appointments>('appointments');
async function checkAvailability(input: EntityInput, scope: Scope, exclude?: string) {
  if (!input.patient || !input.doctor || !input.date || !input.time)
    throw new Error('Patient, practitioner, date and time are required.');
  const minute = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
  const start = minute(String(input.time));
  const duration = Number(input.duration || 30);
  if (start < 8 * 60 || start + duration > 21 * 60 || duration <= 0)
    throw new Error('Choose a slot between 08:00 and 21:00.');
  const rows = await repository.list({ organizationId: scope.organizationId });
  const conflict = rows.some(
    (row) =>
      row.id !== exclude &&
      row.date === input.date &&
      row.doctor === input.doctor &&
      !['Cancelled', 'No Show'].includes(String(row.status)) &&
      start < minute(String(row.time)) + Number(row.duration || 30) &&
      start + duration > minute(String(row.time)),
  );
  if (conflict)
    throw new Error(
      'This practitioner already has a booking during that time. Choose another slot.',
    );
}
export const appointmentsService = {
  ...repository,
  list: repository.list.bind(repository),
  get: repository.get.bind(repository),
  remove: repository.remove.bind(repository),
  async create(input: EntityInput, scope: Scope) {
    await checkAvailability(input, scope);
    return repository.create(input, scope);
  },
  async update(id: string, input: EntityInput, scope: Scope) {
    const current = await repository.get(id, scope);
    if (!current) throw new Error('Appointment not found.');
    await checkAvailability({ ...current, ...input } as EntityInput, scope, id);
    return repository.update(id, input, scope);
  },
};
