'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { pharmacyConfig } from '../config/pharmacy.config';
import { pharmacyService } from '../services/pharmacy.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={pharmacyConfig} repository={pharmacyService} />;
}
