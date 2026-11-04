'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { purchasesConfig } from '../config/purchases.config';
import { purchasesService } from '../services/purchases.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={purchasesConfig} repository={purchasesService} />;
}
