'use client';
import { useEntities } from '@/hooks/use-entities';
import { dermatologyService } from '../services/dermatology.service';
export const useDermatology = () => useEntities('dermatology', dermatologyService);
