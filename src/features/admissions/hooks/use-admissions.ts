'use client';
import { useEntities } from '@/hooks/use-entities';
import { admissionsService } from '../services/admissions.service';
export const useAdmissions = () => useEntities('admissions', admissionsService);
