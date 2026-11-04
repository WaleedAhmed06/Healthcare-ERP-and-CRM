'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { documentsConfig } from '../config/documents.config';
import { documentsService } from '../services/documents.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={documentsConfig} repository={documentsService} />;
}
