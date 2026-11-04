import type { Entity } from '@/types/entity';
export interface Pediatrics extends Entity {
  patient?: string;
  doctor?: string;
  guardian?: string;
  date?: string;
  height?: number;
  weight?: number;
  vaccine?: string;
  followup?: string;
  notes?: string;
}
