import { createRepository } from '@/services/repository-factory';
import type { Organizations } from '../types/organizations.types';
export const organizationsService = createRepository<Organizations>('organizations');
