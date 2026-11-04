'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { staffConfig } from '../config/staff.config';
import { staffService } from '../services/staff.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={staffConfig} repository={staffService} />;
}
