'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { pediatricsConfig } from '../config/pediatrics.config';
import { pediatricsService } from '../services/pediatrics.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={pediatricsConfig} repository={pediatricsService} />;
}
