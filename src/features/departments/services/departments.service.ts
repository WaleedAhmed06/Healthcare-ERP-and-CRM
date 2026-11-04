import { createRepository } from '@/services/repository-factory';
import type { Departments } from '../types/departments.types';
export const departmentsService = createRepository<Departments>('departments');
