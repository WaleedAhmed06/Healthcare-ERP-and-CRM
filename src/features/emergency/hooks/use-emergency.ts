'use client';
import { useEntities } from '@/hooks/use-entities';
import { emergencyService } from '../services/emergency.service';
export const useEmergency = () => useEntities('emergency', emergencyService);
