'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { equipmentConfig } from '../config/equipment.config';
import { equipmentService } from '../services/equipment.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={equipmentConfig} repository={equipmentService} />;
}
