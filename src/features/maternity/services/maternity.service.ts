import { createRepository } from '@/services/repository-factory';
import type { Maternity } from '../types/maternity.types';
export const maternityService = createRepository<Maternity>('maternity');
