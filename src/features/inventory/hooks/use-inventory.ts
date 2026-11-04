'use client';
import { useEntities } from '@/hooks/use-entities';
import { inventoryService } from '../services/inventory.service';
export const useInventory = () => useEntities('inventory', inventoryService);
