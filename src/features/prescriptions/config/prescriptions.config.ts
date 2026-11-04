import type { FeatureDefinition } from '@/types/module';
export const prescriptionsConfig: FeatureDefinition = {
  key: 'prescriptions',
  title: 'Prescriptions',
  group: 'Clinical',
  description: 'Demo prescriptions linked to the patient record.',
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
      key: 'medication',
      label: 'Medication',
      type: 'text',
      required: false,
    },
    {
      key: 'dosage',
      label: 'Dosage',
      type: 'text',
      required: false,
    },
    {
      key: 'frequency',
      label: 'Frequency',
      type: 'text',
      required: false,
    },
    {
      key: 'duration',
      label: 'Duration',
      type: 'text',
      required: false,
    },
    {
      key: 'instructions',
      label: 'Instructions',
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
  columns: ['patient', 'doctor', 'date', 'medication'],
};
