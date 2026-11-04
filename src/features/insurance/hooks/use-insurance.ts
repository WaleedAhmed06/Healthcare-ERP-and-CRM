'use client';
import { useEntities } from '@/hooks/use-entities';
import { insuranceService } from '../services/insurance.service';
export const useInsurance = () => useEntities('insurance', insuranceService);
