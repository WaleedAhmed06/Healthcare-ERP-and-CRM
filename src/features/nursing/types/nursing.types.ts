import type { Entity } from '@/types/entity';
export interface Nursing extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  ward?: string;
  task?: string;
  vitals?: string;
  medication?: string;
  checklist?: string;
  shift?: string;
  status?: string;
  notes?: string;
}
