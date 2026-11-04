'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { plansConfig } from '../config/plans.config';
import { plansService } from '../services/plans.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={plansConfig} repository={plansService} />;
}
