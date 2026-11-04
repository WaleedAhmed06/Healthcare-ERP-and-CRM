'use client';
import { useEntities } from '@/hooks/use-entities';
import { plansService } from '../services/plans.service';
export const usePlans = () => useEntities('plans', plansService);
