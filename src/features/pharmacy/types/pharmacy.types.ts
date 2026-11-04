import type { Entity } from '@/types/entity';
export interface Pharmacy extends Entity {
  name?: string;
  generic?: string;
  brand?: string;
  category?: string;
  batch?: string;
  expiry?: string;
  purchase?: number;
  price?: number;
  stock?: number;
  supplier?: string;
  notes?: string;
}
