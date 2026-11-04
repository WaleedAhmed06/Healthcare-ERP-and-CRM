import type { FeatureDefinition } from '@/types/module';
export const purchasesConfig: FeatureDefinition = {
  key: 'purchases',
  title: 'Purchases & suppliers',
  group: 'Operations',
  description: 'Purchase orders and supplier contacts.',
  fields: [
    {
      key: 'name',
      label: 'Purchase order',
      type: 'text',
      required: true,
    },
    {
      key: 'supplier',
      label: 'Supplier',
      type: 'text',
      required: false,
    },
    {
      key: 'contact',
      label: 'Supplier contact',
      type: 'text',
      required: false,
    },
    {
      key: 'items',
      label: 'Products and quantities',
      type: 'textarea',
      required: false,
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'number',
      required: false,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Draft', 'Ordered', 'Received', 'Cancelled'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['name', 'supplier', 'contact', 'items'],
};
