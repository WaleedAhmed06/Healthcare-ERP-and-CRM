'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { hrConfig } from '../config/hr.config';
import { hrService } from '../services/hr.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={hrConfig} repository={hrService} />;
}
