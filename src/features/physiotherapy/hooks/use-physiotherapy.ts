'use client';
import { useEntities } from '@/hooks/use-entities';
import { physiotherapyService } from '../services/physiotherapy.service';
export const usePhysiotherapy = () => useEntities('physiotherapy', physiotherapyService);
