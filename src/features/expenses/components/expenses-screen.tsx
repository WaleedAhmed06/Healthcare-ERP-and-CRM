'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { expensesConfig } from '../config/expenses.config';
import { expensesService } from '../services/expenses.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={expensesConfig} repository={expensesService} />;
}
