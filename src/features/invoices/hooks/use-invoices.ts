'use client';
import { useEntities } from '@/hooks/use-entities';
import { invoicesService } from '../services/invoices.service';
export const useInvoices = () => useEntities('invoices', invoicesService);
