import type { Entity } from '@/types/entity';
export interface Admissions extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  reason?: string;
  ward?: string;
  bed?: string;
  discharge?: string;
  summary?: string;
  instructions?: string;
  status?: string;
  notes?: string;
}
