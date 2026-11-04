import { createRepository } from '@/services/repository-factory';
import type { Dermatology } from '../types/dermatology.types';
export const dermatologyService = createRepository<Dermatology>('dermatology');
