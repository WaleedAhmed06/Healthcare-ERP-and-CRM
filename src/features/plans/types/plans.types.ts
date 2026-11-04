import type { Entity } from '@/types/entity';
export interface Plans extends Entity {
  patient?: string;
  doctor?: string;
  name?: string;
  procedures?: string;
  sessions?: number;
  completed?: number;
  cost?: number;
  date?: string;
  expiry?: string;
  followup?: string;
  status?: string;
  notes?: string;
}
