'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { subscriptionsConfig } from '../config/subscriptions.config';
import { subscriptionsService } from '../services/subscriptions.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={subscriptionsConfig} repository={subscriptionsService} />;
}
