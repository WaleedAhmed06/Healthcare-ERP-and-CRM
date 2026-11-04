'use client';
import { useEntities } from '@/hooks/use-entities';
import { documentsService } from '../services/documents.service';
export const useDocuments = () => useEntities('documents', documentsService);
