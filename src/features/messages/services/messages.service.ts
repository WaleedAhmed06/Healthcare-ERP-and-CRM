import { createRepository } from '@/services/repository-factory';
import type { Messages } from '../types/messages.types';
export const messagesService = createRepository<Messages>('messages');
