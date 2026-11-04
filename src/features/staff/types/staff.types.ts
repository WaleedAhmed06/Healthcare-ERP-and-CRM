import type { Entity } from '@/types/entity';
export interface Staff extends Entity {
  name?: string;
  role?: string;
  specialization?: string;
  registration?: string;
  qualifications?: string;
  experience?: number;
  phone?: string;
  email?: string;
  department?: string;
  fee?: number;
  hours?: string;
  duration?: number;
  salary?: number;
  share?: number;
  commission?: number;
  status?: string;
  notes?: string;
}
