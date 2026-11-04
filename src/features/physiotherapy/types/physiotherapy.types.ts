import type { Entity } from '@/types/entity';
export interface Physiotherapy extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  assessment?: string;
  mobility?: string;
  exercises?: string;
  sessions?: number;
  completed?: number;
  followup?: string;
  notes?: string;
}
