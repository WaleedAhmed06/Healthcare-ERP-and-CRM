import type { FeatureDefinition } from '@/types/module';
export const pediatricsConfig: FeatureDefinition = {
  key: 'pediatrics',
  title: 'Pediatrics',
  group: 'Specialties',
  description: 'Growth, guardians and vaccination history.',
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
      key: 'guardian',
      label: 'Parent / guardian',
      type: 'text',
      required: false,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      required: false,
    },
    {
      key: 'height',
      label: 'Height cm',
      type: 'number',
      required: false,
    },
    {
      key: 'weight',
      label: 'Weight kg',
      type: 'number',
      required: false,
    },
    {
      key: 'vaccine',
      label: 'Vaccination',
      type: 'text',
      required: false,
    },
    {
      key: 'followup',
      label: 'Next visit',
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
  columns: ['patient', 'doctor', 'guardian', 'date'],
};
