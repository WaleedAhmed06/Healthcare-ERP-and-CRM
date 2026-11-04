import type { Entity } from '@/types/entity';
export interface Equipment extends Entity {
  name?: string;
  serial?: string;
  department?: string;
  purchaseDate?: string;
  maintenance?: string;
  nextService?: string;
  status?: string;
  notes?: string;
}
