import type { Entity } from '@/types/entity';
export interface Theatre extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  time?: string;
  room?: string;
  procedure?: string;
  team?: string;
  status?: string;
  notes?: string;
}
