'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { prescriptionsConfig } from '../config/prescriptions.config';
import { prescriptionsService } from '../services/prescriptions.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={prescriptionsConfig} repository={prescriptionsService} />;
}
