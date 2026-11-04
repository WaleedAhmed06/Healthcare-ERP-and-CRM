import { createRepository } from '@/services/repository-factory';
import type { Plans } from '../types/plans.types';
export const plansService = createRepository<Plans>('plans');
