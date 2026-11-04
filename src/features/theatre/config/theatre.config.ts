import type { FeatureDefinition } from '@/types/module';
export const theatreConfig: FeatureDefinition = {
  key: 'theatre',
  title: 'Operation theatre',
  group: 'Specialties',
  description: 'Procedures, theatre availability and surgical teams.',
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
      key: 'time',
      label: 'Start time',
      type: 'time',
      required: false,
    },
    {
      key: 'room',
      label: 'Theatre',
      type: 'text',
      required: false,
    },
    {
      key: 'procedure',
      label: 'Procedure',
      type: 'text',
      required: false,
    },
    {
      key: 'team',
      label: 'Medical team',
      type: 'text',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['patient', 'doctor', 'date', 'time'],
  specialty: 'Hospital',
};
