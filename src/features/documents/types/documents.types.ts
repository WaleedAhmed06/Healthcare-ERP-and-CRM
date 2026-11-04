import type { Entity } from '@/types/entity';
export interface Documents extends Entity {
  patient?: string;
  name?: string;
  category?: string;
  date?: string;
  notes?: string;
}
