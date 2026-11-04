'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { organizationsConfig } from '../config/organizations.config';
import { organizationsService } from '../services/organizations.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={organizationsConfig} repository={organizationsService} />;
}
