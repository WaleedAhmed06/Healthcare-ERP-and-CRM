import type { FeatureDefinition } from '@/types/module';
export const physiotherapyConfig: FeatureDefinition = {
  key: 'physiotherapy',
  title: 'Physiotherapy',
  group: 'Specialties',
  description: 'Rehabilitation assessments, exercise plans and progress.',
  fields: [
    {
      key: 'patient',
      label: 'Patient',
      type: 'text',
      relation: 'patients',
      required: true,
    },
    {
      key: 'doctor',
      label: 'Practitioner',
      type: 'text',
      relation: 'staff',
      required: false,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      required: false,
    },
    {
      key: 'assessment',
      label: 'Patient assessment',
      type: 'textarea',
      required: false,
    },
    {
      key: 'mobility',
      label: 'Mobility records',
      type: 'text',
      required: false,
    },
    {
      key: 'exercises',
      label: 'Exercise plan',
      type: 'textarea',
      required: false,
    },
    {
      key: 'sessions',
      label: 'Total sessions',
      type: 'number',
      required: false,
    },
    {
      key: 'completed',
      label: 'Completed sessions',
      type: 'number',
      required: false,
    },
    {
      key: 'followup',
      label: 'Follow-up',
      type: 'date',
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['patient', 'doctor', 'date', 'assessment'],
};
