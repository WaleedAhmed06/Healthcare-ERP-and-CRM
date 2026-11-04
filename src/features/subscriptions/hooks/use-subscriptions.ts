'use client';
import { useEntities } from '@/hooks/use-entities';
import { subscriptionsService } from '../services/subscriptions.service';
export const useSubscriptions = () => useEntities('subscriptions', subscriptionsService);
