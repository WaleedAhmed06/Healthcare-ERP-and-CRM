import { createRepository } from '@/services/repository-factory';
import type { Laboratory } from '../types/laboratory.types';
export const laboratoryService = createRepository<Laboratory>('laboratory');
