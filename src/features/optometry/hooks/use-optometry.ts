'use client';
import { useEntities } from '@/hooks/use-entities';
import { optometryService } from '../services/optometry.service';
export const useOptometry = () => useEntities('optometry', optometryService);
