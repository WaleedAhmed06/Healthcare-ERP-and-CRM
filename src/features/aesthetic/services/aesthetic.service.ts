import { createRepository } from '@/services/repository-factory';
import type { Aesthetic } from '../types/aesthetic.types';
export const aestheticService = createRepository<Aesthetic>('aesthetic');
