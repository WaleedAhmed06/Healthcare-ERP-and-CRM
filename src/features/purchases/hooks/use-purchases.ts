'use client';
import { useEntities } from '@/hooks/use-entities';
import { purchasesService } from '../services/purchases.service';
export const usePurchases = () => useEntities('purchases', purchasesService);
