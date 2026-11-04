'use client';
import { EntityWorkspace } from '@/features/workspace/components/feature-workspace';
import { messagesConfig } from '../config/messages.config';
import { messagesService } from '../services/messages.service';
export default function FeatureScreen() {
  return <EntityWorkspace definition={messagesConfig} repository={messagesService} />;
}
