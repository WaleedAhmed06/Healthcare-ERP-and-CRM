'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { nursingConfig } from '../config/nursing.config';
import { nursingService } from '../services/nursing.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={nursingConfig} repository={nursingService} />;
}
