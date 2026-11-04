import type { Entity } from '@/types/entity';
export interface Inventory extends Entity {
  name?: string;
  category?: string;
  stock?: number;
  minimum?: number;
  batch?: string;
  expiry?: string;
  price?: number;
  supplier?: string;
  notes?: string;
}
