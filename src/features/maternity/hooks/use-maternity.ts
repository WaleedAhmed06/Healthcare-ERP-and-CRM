'use client';
import { useEntities } from '@/hooks/use-entities';
import { maternityService } from '../services/maternity.service';
export const useMaternity = () => useEntities('maternity', maternityService);
