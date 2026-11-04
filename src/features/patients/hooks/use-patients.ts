'use client';
import { useEntities } from '@/hooks/use-entities';
import { patientsService } from '../services/patients.service';
export const usePatients = () => useEntities('patients', patientsService);
