'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { servicesConfig } from '../config/services.config';
import { servicesService } from '../services/services.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={servicesConfig} repository={servicesService} />;
}
