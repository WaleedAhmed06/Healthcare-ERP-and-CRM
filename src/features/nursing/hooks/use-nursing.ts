'use client';
import { useEntities } from '@/hooks/use-entities';
import { nursingService } from '../services/nursing.service';
export const useNursing = () => useEntities('nursing', nursingService);
