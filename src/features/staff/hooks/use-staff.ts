'use client';
import { useEntities } from '@/hooks/use-entities';
import { staffService } from '../services/staff.service';
export const useStaff = () => useEntities('staff', staffService);
