import { createRepository } from '@/services/repository-factory';
import type { Pharmacy } from '../types/pharmacy.types';
export const pharmacyService = createRepository<Pharmacy>('pharmacy');
