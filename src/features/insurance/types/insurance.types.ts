import type { Entity } from '@/types/entity';
export interface Insurance extends Entity {
  patient?: string;
  company?: string;
  plan?: string;
  policy?: string;
  coverage?: string;
  amount?: number;
  status?: string;
  notes?: string;
}
