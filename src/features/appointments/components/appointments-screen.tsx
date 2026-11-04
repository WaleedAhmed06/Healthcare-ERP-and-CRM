'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { appointmentsConfig } from '../config/appointments.config';
import { appointmentsService } from '../services/appointments.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={appointmentsConfig} repository={appointmentsService} />;
}
