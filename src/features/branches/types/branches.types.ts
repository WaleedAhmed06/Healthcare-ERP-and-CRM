import type { Entity } from '@/types/entity';
export interface Branches extends Entity {
  name?: string;
  manager?: string;
  phone?: string;
  address?: string;
  hours?: string;
  rooms?: string;
  status?: string;
  notes?: string;
}
