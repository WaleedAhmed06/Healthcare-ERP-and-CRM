import { createRepository } from '@/services/repository-factory';
import type { Optometry } from '../types/optometry.types';
export const optometryService = createRepository<Optometry>('optometry');
