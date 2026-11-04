'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { departmentsConfig } from '../config/departments.config';
import { departmentsService } from '../services/departments.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={departmentsConfig} repository={departmentsService} />;
}
