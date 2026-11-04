import type { Entity } from '@/types/entity';
export interface Hr extends Entity {
  employee?: string;
  date?: string;
  shift?: string;
  attendance?: string;
  leaveType?: string;
  salary?: number;
  status?: string;
  notes?: string;
}
