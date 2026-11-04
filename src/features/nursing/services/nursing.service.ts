import { createRepository } from '@/services/repository-factory';
import type { Nursing } from '../types/nursing.types';
export const nursingService = createRepository<Nursing>('nursing');
