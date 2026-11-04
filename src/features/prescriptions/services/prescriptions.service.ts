import { createRepository } from '@/services/repository-factory';
import type { Prescriptions } from '../types/prescriptions.types';
export const prescriptionsService = createRepository<Prescriptions>('prescriptions');
