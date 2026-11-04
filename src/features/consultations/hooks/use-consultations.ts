'use client';
import { useEntities } from '@/hooks/use-entities';
import { consultationsService } from '../services/consultations.service';
export const useConsultations = () => useEntities('consultations', consultationsService);
