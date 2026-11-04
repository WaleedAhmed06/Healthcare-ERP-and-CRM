import type { Entity } from '@/types/entity';
export interface Optometry extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  left?: string;
  right?: string;
  lens?: string;
  examination?: string;
  followup?: string;
  notes?: string;
}
