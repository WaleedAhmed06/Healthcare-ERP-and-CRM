import { createRepository } from '@/services/repository-factory';
import type { Dental } from '../types/dental.types';
export const dentalService = createRepository<Dental>('dental');
