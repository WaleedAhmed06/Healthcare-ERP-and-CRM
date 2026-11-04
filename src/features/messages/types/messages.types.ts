import type { Entity } from '@/types/entity';
export interface Messages extends Entity {
  patient?: string;
  name?: string;
  message?: string;
  date?: string;
  status?: string;
}
