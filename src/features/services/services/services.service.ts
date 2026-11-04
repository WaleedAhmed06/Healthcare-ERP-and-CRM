import { createRepository } from '@/services/repository-factory';
import type { Services } from '../types/services.types';
export const servicesService = createRepository<Services>('services');
