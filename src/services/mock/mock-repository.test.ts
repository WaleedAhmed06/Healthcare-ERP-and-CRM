import { beforeEach, it, expect } from 'vitest';
import { MockRepository } from './mock-repository';
import { resetDatabase } from './mock-database';
import { admissionsService } from '@/features/admissions/services/admissions.service';
import { appointmentsService } from '@/features/appointments/services/appointments.service';
const storage = new Map<string, string>();
beforeEach(() => {
  Object.defineProperty(globalThis, 'window', {
    value: {
      localStorage: {
        getItem: (k: string) => storage.get(k) || null,
        setItem: (k: string, v: string) => storage.set(k, v),
        removeItem: (k: string) => storage.delete(k),
      },
    },
    configurable: true,
  });
  resetDatabase();
});
it('lists only the selected organization and patient', async () => {
  const rows = await new MockRepository('appointments').list({
    organizationId: 'city',
    patientId: 'PAT-1001',
  });
  expect(rows.length).toBeGreaterThan(0);
  expect(rows.every((r) => r.organizationId === 'city' && r.patient === 'PAT-1001')).toBe(true);
});
it('rejects updates outside scope', async () => {
  const repository = new MockRepository('patients');
  const row = (await repository.list({ organizationId: 'elite' }))[0];
  await expect(
    repository.update(row.id, { name: 'Changed' }, { organizationId: 'city' }),
  ).rejects.toThrow('unavailable');
});
it('rejects double-booking a practitioner', async () => {
  const existing = (await appointmentsService.list({ organizationId: 'city' }))[0];
  await expect(
    appointmentsService.create(
      {
        patient: 'PAT-1001',
        doctor: String(existing.doctor),
        date: String(existing.date),
        time: String(existing.time),
        duration: 30,
      },
      { organizationId: 'city' },
    ),
  ).rejects.toThrow('already has a booking');
});
it('rejects occupied beds and atomically reserves available beds', async () => {
  await expect(
    admissionsService.create(
      { patient: 'PAT-1001', bed: 'G-01', status: 'Admitted' },
      { organizationId: 'city' },
    ),
  ).rejects.toThrow('available bed');
  const admission = await admissionsService.create(
    { patient: 'PAT-1001', bed: 'G-05', status: 'Admitted' },
    { organizationId: 'city' },
  );
  expect(admission.bed).toBe('G-05');
  const beds = await new MockRepository('beds').list({ organizationId: 'city' });
  expect(beds.find((b) => b.name === 'G-05')?.status).toBe('Occupied');
});
