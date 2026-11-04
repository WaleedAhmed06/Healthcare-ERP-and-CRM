'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { consultationsConfig } from '../config/consultations.config';
import { consultationsService } from '../services/consultations.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={consultationsConfig} repository={consultationsService} />;
}
