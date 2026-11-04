import type { Entity } from '@/types/entity';
export interface Invoices extends Entity {
  patient?: string;
  date?: string;
  items?: string;
  subtotal?: number;
  discount?: number;
  tax?: number;
  due?: string;
  notes?: string;
}
