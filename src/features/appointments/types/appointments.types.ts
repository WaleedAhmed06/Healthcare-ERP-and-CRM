import type { Entity } from '@/types/entity';
export interface Appointments extends Entity {
  patient?: string;
  doctor?: string;
  service?: string;
  department?: string;
  date?: string;
  time?: string;
  duration?: number;
  room?: string;
  recurrence?: string;
  status?: string;
  notes?: string;
}
