'use client';
import { useEntities } from '@/hooks/use-entities';
import { laboratoryService } from '../services/laboratory.service';
export const useLaboratory = () => useEntities('laboratory', laboratoryService);
