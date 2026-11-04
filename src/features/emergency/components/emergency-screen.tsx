'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { emergencyConfig } from '../config/emergency.config';
import { emergencyService } from '../services/emergency.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={emergencyConfig} repository={emergencyService} />;
}
