'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { physiotherapyConfig } from '../config/physiotherapy.config';
import { physiotherapyService } from '../services/physiotherapy.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={physiotherapyConfig} repository={physiotherapyService} />;
}
