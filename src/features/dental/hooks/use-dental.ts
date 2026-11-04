'use client';
import { useEntities } from '@/hooks/use-entities';
import { dentalService } from '../services/dental.service';
export const useDental = () => useEntities('dental', dentalService);
