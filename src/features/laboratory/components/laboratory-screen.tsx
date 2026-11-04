'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { laboratoryConfig } from '../config/laboratory.config';
import { laboratoryService } from '../services/laboratory.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={laboratoryConfig} repository={laboratoryService} />;
}
