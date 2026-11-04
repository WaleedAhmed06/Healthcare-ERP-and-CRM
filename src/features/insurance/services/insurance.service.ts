import { createRepository } from '@/services/repository-factory';
import type { Insurance } from '../types/insurance.types';
export const insuranceService = createRepository<Insurance>('insurance');
