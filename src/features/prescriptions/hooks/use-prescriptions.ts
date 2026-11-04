'use client';
import { useEntities } from '@/hooks/use-entities';
import { prescriptionsService } from '../services/prescriptions.service';
export const usePrescriptions = () => useEntities('prescriptions', prescriptionsService);
