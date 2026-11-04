import { createRepository } from '@/services/repository-factory';
import type { Branches } from '../types/branches.types';
export const branchesService = createRepository<Branches>('branches');
