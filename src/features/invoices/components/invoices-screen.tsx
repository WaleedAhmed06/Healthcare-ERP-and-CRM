'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { invoicesConfig } from '../config/invoices.config';
import { invoicesService } from '../services/invoices.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={invoicesConfig} repository={invoicesService} />;
}
