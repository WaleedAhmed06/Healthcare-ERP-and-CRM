import type { Entity } from '@/types/entity';
export interface Services extends Entity {
  name?: string;
  category?: string;
  description?: string;
  department?: string;
  doctor?: string;
  duration?: number;
  price?: number;
  tax?: number;
  discount?: number;
  status?: string;
}
