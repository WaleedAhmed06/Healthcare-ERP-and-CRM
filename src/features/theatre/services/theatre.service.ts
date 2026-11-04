import { createRepository } from '@/services/repository-factory';
import type { Theatre } from '../types/theatre.types';
export const theatreService = createRepository<Theatre>('theatre');
