'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { branchesConfig } from '../config/branches.config';
import { branchesService } from '../services/branches.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={branchesConfig} repository={branchesService} />;
}
