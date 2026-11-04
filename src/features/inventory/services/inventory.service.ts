import { createRepository } from '@/services/repository-factory';
import type { Inventory } from '../types/inventory.types';
export const inventoryService = createRepository<Inventory>('inventory');
