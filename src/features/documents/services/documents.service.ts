import { createRepository } from '@/services/repository-factory';
import type { Documents } from '../types/documents.types';
export const documentsService = createRepository<Documents>('documents');
