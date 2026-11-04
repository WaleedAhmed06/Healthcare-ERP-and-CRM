import type { Entity } from '@/types/entity';
export interface Maternity extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  gestation?: number;
  history?: string;
  assessment?: string;
  ultrasound?: string;
  followup?: string;
  notes?: string;
}
