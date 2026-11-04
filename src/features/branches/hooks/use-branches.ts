'use client';
import { useEntities } from '@/hooks/use-entities';
import { branchesService } from '../services/branches.service';
export const useBranches = () => useEntities('branches', branchesService);
