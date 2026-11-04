'use client';
import { useEntities } from '@/hooks/use-entities';
import { aestheticService } from '../services/aesthetic.service';
export const useAesthetic = () => useEntities('aesthetic', aestheticService);
