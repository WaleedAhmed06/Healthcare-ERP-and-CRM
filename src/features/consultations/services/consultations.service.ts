import { createRepository } from '@/services/repository-factory';
import type { Consultations } from '../types/consultations.types';
export const consultationsService = createRepository<Consultations>('consultations');
