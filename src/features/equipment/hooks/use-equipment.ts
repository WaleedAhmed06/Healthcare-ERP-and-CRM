'use client';
import { useEntities } from '@/hooks/use-entities';
import { equipmentService } from '../services/equipment.service';
export const useEquipment = () => useEntities('equipment', equipmentService);
