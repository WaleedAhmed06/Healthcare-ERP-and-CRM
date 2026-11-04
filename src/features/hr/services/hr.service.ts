import { createRepository } from '@/services/repository-factory';
import type { Hr } from '../types/hr.types';
export const hrService = createRepository<Hr>('hr');
