import type { Entity } from '@/types/entity';
export interface Patients extends Entity {
  name?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  emergency?: string;
  blood?: string;
  category?: string;
  allergies?: string;
  history?: string;
  referral?: string;
  status?: string;
  notes?: string;
}
