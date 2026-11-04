import type { Entity } from '@/types/entity';
export interface Expenses extends Entity {
  name?: string;
  category?: string;
  amount?: number;
  date?: string;
  receipt?: string;
  status?: string;
  notes?: string;
}
