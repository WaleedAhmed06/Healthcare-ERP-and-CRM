'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { inventoryConfig } from '../config/inventory.config';
import { inventoryService } from '../services/inventory.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={inventoryConfig} repository={inventoryService} />;
}
