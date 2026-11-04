import { createRepository } from '@/services/repository-factory';
import type { Emergency } from '../types/emergency.types';
export const emergencyService = createRepository<Emergency>('emergency');
