'use client';
import type { Entity } from '@/types/entity';
import { ToothChart } from '@/features/dental/components/tooth-chart';
import { BedBoard } from '@/features/admissions/components/bed-board';
import { DocumentUpload } from '@/features/documents/components/document-upload';
import { AppointmentCalendar } from '@/features/appointments/components/appointment-calendar';
import { PhotoComparison } from '@/features/aesthetic/components/photo-comparison';
export function SpecialtyPanel({ resource, records }: { resource: string; records: Entity[] }) {
  if (resource === 'dental') return <ToothChart records={records} />;
  if (resource === 'admissions') return <BedBoard />;
  if (resource === 'documents') return <DocumentUpload />;
  if (resource === 'appointments') return <AppointmentCalendar records={records} />;
  if (resource === 'aesthetic' || resource === 'dermatology') return <PhotoComparison />;
  return null;
}
