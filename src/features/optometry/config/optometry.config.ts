import type { FeatureDefinition } from '@/types/module';
export const optometryConfig: FeatureDefinition = {
  key: 'optometry',
  title: 'Eye clinic',
  group: 'Specialties',
  description: 'Examinations, visual acuity and lens prescriptions.',
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
      key: 'left',
      label: 'Left eye acuity / prescription',
      type: 'text',
      required: false,
    },
    {
      key: 'right',
      label: 'Right eye acuity / prescription',
      type: 'text',
      required: false,
    },
    {
      key: 'lens',
      label: 'Lens prescription',
      type: 'text',
      required: false,
    },
    {
      key: 'examination',
      label: 'Eye examination',
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
  columns: ['patient', 'doctor', 'date', 'left'],
};
