import type { Entity } from '@/types/entity';
export interface Dental extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  tooth?: string;
  condition?: string;
  procedure?: string;
  cost?: number;
  followup?: string;
  status?: string;
  notes?: string;
}
