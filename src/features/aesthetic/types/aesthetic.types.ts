import type { Entity } from '@/types/entity';
export interface Aesthetic extends Entity {
  patient?: string;
  doctor?: string;
  name?: string;
  skin?: string;
  preferences?: string;
  sessions?: number;
  completed?: number;
  cost?: number;
  expiry?: string;
  followup?: string;
  status?: string;
  notes?: string;
}
