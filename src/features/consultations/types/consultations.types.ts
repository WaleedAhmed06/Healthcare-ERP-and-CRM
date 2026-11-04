import type { Entity } from '@/types/entity';
export interface Consultations extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  complaint?: string;
  symptoms?: string;
  bp?: string;
  heart?: number;
  temperature?: number;
  respiratory?: number;
  oxygen?: number;
  height?: number;
  weight?: number;
  findings?: string;
  diagnosis?: string;
  treatment?: string;
  followup?: string;
  status?: string;
  notes?: string;
}
