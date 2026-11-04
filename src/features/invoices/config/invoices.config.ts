import type { FeatureDefinition } from '@/types/module';
export const invoicesConfig: FeatureDefinition = {
  key: 'invoices',
  title: 'Billing & payments',
  group: 'Finance',
  description: 'Clear billing. Connected payments. Healthy cash flow.',
  fields: [
    {
      key: 'patient',
      label: 'Patient',
      type: 'text',
      relation: 'patients',
      required: true,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      required: false,
    },
    {
      key: 'items',
      label: 'Service / procedure line items',
      type: 'textarea',
      required: false,
    },
    {
      key: 'subtotal',
      label: 'Subtotal',
      type: 'number',
      required: false,
    },
    {
      key: 'discount',
      label: 'Discount',
      type: 'number',
      required: false,
    },
    {
      key: 'tax',
      label: 'Tax %',
      type: 'number',
      required: false,
    },
    {
      key: 'due',
      label: 'Due date',
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
  columns: ['patient', 'date', 'items', 'subtotal'],
};
