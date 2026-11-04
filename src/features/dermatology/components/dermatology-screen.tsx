'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { dermatologyConfig } from '../config/dermatology.config';
import { dermatologyService } from '../services/dermatology.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={dermatologyConfig} repository={dermatologyService} />;
}
