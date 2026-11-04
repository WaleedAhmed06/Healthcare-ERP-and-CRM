import type { Entity } from '@/types/entity';
export interface Dermatology extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  skin?: string;
  hair?: string;
  nails?: string;
  assessment?: string;
  diagnosis?: string;
  treatment?: string;
  followup?: string;
  notes?: string;
}
