import type { FeatureDefinition } from '@/types/module';
export const maternityConfig: FeatureDefinition = {
  key: 'maternity',
  title: 'Maternity',
  group: 'Specialties',
  description: 'Antenatal visits and maternity records.',
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
      key: 'gestation',
      label: 'Gestation weeks',
      type: 'number',
      required: false,
    },
    {
      key: 'history',
      label: 'Pregnancy history',
      type: 'textarea',
      required: false,
    },
    {
      key: 'assessment',
      label: 'Visit assessment',
      type: 'textarea',
      required: false,
    },
    {
      key: 'ultrasound',
      label: 'Ultrasound document reference',
      type: 'text',
      required: false,
    },
    {
      key: 'followup',
      label: 'Next antenatal visit',
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
  columns: ['patient', 'doctor', 'date', 'gestation'],
};
