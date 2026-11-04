'use client';
import { useEntities } from '@/hooks/use-entities';
import { messagesService } from '../services/messages.service';
export const useMessages = () => useEntities('messages', messagesService);
