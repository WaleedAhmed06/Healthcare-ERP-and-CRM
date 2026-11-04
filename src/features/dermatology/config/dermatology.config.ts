import type { FeatureDefinition } from '@/types/module';
export const dermatologyConfig: FeatureDefinition = {
  key: 'dermatology',
  title: 'Dermatology',
  group: 'Specialties',
  description: 'Skin assessments and longitudinal treatment records.',
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
      key: 'skin',
      label: 'Skin concerns',
      type: 'text',
      required: false,
    },
    {
      key: 'hair',
      label: 'Hair concerns',
      type: 'text',
      required: false,
    },
    {
      key: 'nails',
      label: 'Nail concerns',
      type: 'text',
      required: false,
    },
    {
      key: 'assessment',
      label: 'Skin examination',
      type: 'textarea',
      required: false,
    },
    {
      key: 'diagnosis',
      label: 'Sample diagnosis',
      type: 'text',
      required: false,
    },
    {
      key: 'treatment',
      label: 'Treatment plan',
      type: 'textarea',
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
  columns: ['patient', 'doctor', 'date', 'skin'],
  specialty: 'Dermatology Clinic',
};
