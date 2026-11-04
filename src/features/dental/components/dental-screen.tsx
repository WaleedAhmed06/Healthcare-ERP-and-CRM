'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { dentalConfig } from '../config/dental.config';
import { dentalService } from '../services/dental.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={dentalConfig} repository={dentalService} />;
}
