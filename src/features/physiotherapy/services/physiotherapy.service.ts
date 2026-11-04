import { createRepository } from '@/services/repository-factory';
import type { Physiotherapy } from '../types/physiotherapy.types';
export const physiotherapyService = createRepository<Physiotherapy>('physiotherapy');
