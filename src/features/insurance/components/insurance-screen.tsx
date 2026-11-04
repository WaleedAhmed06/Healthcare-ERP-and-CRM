'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { insuranceConfig } from '../config/insurance.config';
import { insuranceService } from '../services/insurance.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={insuranceConfig} repository={insuranceService} />;
}
