import { createRepository } from '@/services/repository-factory';
import type { Equipment } from '../types/equipment.types';
export const equipmentService = createRepository<Equipment>('equipment');
