import { createRepository } from '@/services/repository-factory';
import type { Subscriptions } from '../types/subscriptions.types';
export const subscriptionsService = createRepository<Subscriptions>('subscriptions');
