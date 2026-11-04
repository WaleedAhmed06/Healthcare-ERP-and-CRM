import type { Entity } from '@/types/entity';
export interface Subscriptions extends Entity {
  name?: string;
  price?: number;
  billing?: string;
  users?: number;
  branches?: number;
  storage?: number;
  access?: string;
  trial?: number;
  status?: string;
}
