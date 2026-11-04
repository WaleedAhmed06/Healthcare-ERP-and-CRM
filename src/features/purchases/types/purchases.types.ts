import type { Entity } from '@/types/entity';
export interface Purchases extends Entity {
  name?: string;
  supplier?: string;
  contact?: string;
  items?: string;
  amount?: number;
  date?: string;
  status?: string;
  notes?: string;
}
