'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { theatreConfig } from '../config/theatre.config';
import { theatreService } from '../services/theatre.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={theatreConfig} repository={theatreService} />;
}
