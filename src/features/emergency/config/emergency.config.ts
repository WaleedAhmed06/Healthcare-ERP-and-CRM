import type { FeatureDefinition } from '@/types/module';
export const emergencyConfig: FeatureDefinition = {
  key: 'emergency',
  title: 'Emergency',
  group: 'Specialties',
  description: 'Arrival, triage and rapid coordination of care.',
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
      key: 'arrival',
      label: 'Arrival time',
      type: 'time',
      required: false,
    },
    {
      key: 'priority',
      label: 'Triage priority',
      type: 'select',
      options: ['Immediate', 'Urgent', 'Standard'],
      required: false,
    },
    {
      key: 'triage',
      label: 'Triage observations',
      type: 'textarea',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Waiting', 'In Treatment', 'Admitted', 'Discharged'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['patient', 'doctor', 'date', 'arrival'],
  specialty: 'Hospital',
};
