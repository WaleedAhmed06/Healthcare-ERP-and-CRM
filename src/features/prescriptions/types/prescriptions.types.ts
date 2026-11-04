import type { Entity } from '@/types/entity';
export interface Prescriptions extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  medication?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  followup?: string;
  notes?: string;
}
