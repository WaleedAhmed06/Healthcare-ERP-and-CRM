import { createRepository } from '@/services/repository-factory';
import type { Patients } from '../types/patients.types';
export const patientsService = createRepository<Patients>('patients');
