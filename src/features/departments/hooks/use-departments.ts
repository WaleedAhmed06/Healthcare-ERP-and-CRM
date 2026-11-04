'use client';
import { useEntities } from '@/hooks/use-entities';
import { departmentsService } from '../services/departments.service';
export const useDepartments = () => useEntities('departments', departmentsService);
