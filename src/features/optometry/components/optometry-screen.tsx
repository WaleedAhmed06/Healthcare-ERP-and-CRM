'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { optometryConfig } from '../config/optometry.config';
import { optometryService } from '../services/optometry.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={optometryConfig} repository={optometryService} />;
}
