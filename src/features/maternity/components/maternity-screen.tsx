'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { maternityConfig } from '../config/maternity.config';
import { maternityService } from '../services/maternity.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={maternityConfig} repository={maternityService} />;
}
