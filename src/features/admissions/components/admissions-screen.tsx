'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { admissionsConfig } from '../config/admissions.config';
import { admissionsService } from '../services/admissions.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={admissionsConfig} repository={admissionsService} />;
}
