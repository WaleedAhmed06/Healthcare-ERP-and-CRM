import type { Entity } from '@/types/entity';
export interface Departments extends Entity {
  name?: string;
  doctors?: string;
  nurses?: string;
  timetable?: string;
  notes?: string;
}
