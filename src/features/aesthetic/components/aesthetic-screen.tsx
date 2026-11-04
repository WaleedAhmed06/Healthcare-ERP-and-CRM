'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { aestheticConfig } from '../config/aesthetic.config';
import { aestheticService } from '../services/aesthetic.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={aestheticConfig} repository={aestheticService} />;
}
