import type { Entity } from '@/types/entity';
export interface Laboratory extends Entity {
  patient?: string;
  doctor?: string;
  date?: string;
  test?: string;
  priority?: string;
  sample?: string;
  sampleType?: string;
  technician?: string;
  result?: string;
  range?: string;
  status?: string;
  notes?: string;
}
