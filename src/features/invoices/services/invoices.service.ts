import { createRepository } from '@/services/repository-factory';
import type { Invoices } from '../types/invoices.types';
export const invoicesService = createRepository<Invoices>('invoices');
