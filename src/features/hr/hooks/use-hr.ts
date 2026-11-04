'use client';
import { useEntities } from '@/hooks/use-entities';
import { hrService } from '../services/hr.service';
export const useHr = () => useEntities('hr', hrService);
