import type { Entity } from '@/types/entity';
export interface Organizations extends Entity {
  name?: string;
  type?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  registration?: string;
  plan?: string;
  expiry?: string;
  status?: string;
}
