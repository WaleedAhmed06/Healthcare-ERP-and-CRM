import type { FeatureDefinition } from '@/types/module';
export const insuranceConfig: FeatureDefinition = {
  key: 'insurance',
  title: 'Insurance & corporate',
  group: 'Finance',
  description: 'Coverage, claims and corporate accounts. Demo submissions only.',
  fields: [
    {
      key: 'patient',
      label: 'Patient',
      type: 'text',
      relation: 'patients',
      required: true,
    },
    {
      key: 'company',
      label: 'Insurance / corporate company',
      type: 'text',
      required: false,
    },
    {
      key: 'plan',
      label: 'Plan',
      type: 'text',
      required: false,
    },
    {
      key: 'policy',
      label: 'Policy number',
      type: 'text',
      required: false,
    },
    {
      key: 'coverage',
      label: 'Coverage details',
      type: 'text',
      required: false,
    },
    {
      key: 'amount',
      label: 'Claim amount',
      type: 'number',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Draft', 'Pending', 'Approved', 'Rejected', 'Settled'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['patient', 'company', 'plan', 'policy'],
};
