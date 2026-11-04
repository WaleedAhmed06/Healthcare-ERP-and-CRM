'use client';
import { useEntities } from '@/hooks/use-entities';
import { pharmacyService } from '../services/pharmacy.service';
export const usePharmacy = () => useEntities('pharmacy', pharmacyService);
