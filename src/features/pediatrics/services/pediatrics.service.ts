import { createRepository } from '@/services/repository-factory';
import type { Pediatrics } from '../types/pediatrics.types';
export const pediatricsService = createRepository<Pediatrics>('pediatrics');
