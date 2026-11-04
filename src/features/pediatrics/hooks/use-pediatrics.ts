'use client';
import { useEntities } from '@/hooks/use-entities';
import { pediatricsService } from '../services/pediatrics.service';
export const usePediatrics = () => useEntities('pediatrics', pediatricsService);
