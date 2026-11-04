import { createRepository } from '@/services/repository-factory';
import type { Staff } from '../types/staff.types';
export const staffService = createRepository<Staff>('staff');
