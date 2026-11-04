'use client';
import { useEntities } from '@/hooks/use-entities';
import { servicesService } from '../services/services.service';
export const useServices = () => useEntities('services', servicesService);
