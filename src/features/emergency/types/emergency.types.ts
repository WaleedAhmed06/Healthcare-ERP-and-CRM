import type { Entity } from '@/types/entity';
export interface Emergency extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  arrival?: string;
  priority?: string;
  triage?: string;
  status?: string;
  notes?: string;
}
