import { createRepository } from '@/services/repository-factory';
import type { Purchases } from '../types/purchases.types';
export const purchasesService = createRepository<Purchases>('purchases');
