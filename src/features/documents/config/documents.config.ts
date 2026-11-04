import type { FeatureDefinition } from '@/types/module';
export const documentsConfig: FeatureDefinition = {
  key: 'documents',
  title: 'Documents',
  group: 'Operations',
  description: 'Patient-linked reports, consent forms and demo attachments.',
  fields: [
    {
      key: 'patient',
      label: 'Patient',
      type: 'text',
      relation: 'patients',
      required: true,
    },
    {
      key: 'name',
      label: 'Document title',
      type: 'text',
      required: true,
    },
    {
      key: 'category',
      label: 'Type',
      type: 'select',
      options: [
        'Identity',
        'Medical report',
        'Lab report',
        'Imaging',
        'Prescription',
        'Consent',
        'Treatment photo',
        'Insurance',
        'Discharge summary',
      ],
      required: false,
    },
    {
      key: 'date',
      label: 'Date',
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
  columns: ['patient', 'name', 'category', 'date'],
};
