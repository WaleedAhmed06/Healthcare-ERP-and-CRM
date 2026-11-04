'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { patientsConfig } from '../config/patients.config';
import { patientsService } from '../services/patients.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={patientsConfig} repository={patientsService} />;
}
