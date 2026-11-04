import type { FeatureDefinition } from '@/types/module';
export const pharmacyConfig: FeatureDefinition = {
  key: 'pharmacy',
  title: 'Pharmacy',
  group: 'Clinical',
  description: 'Medicine batches, stock and dispensing.',
  fields: [
    {
      key: 'name',
      label: 'Medicine name',
      type: 'text',
      required: true,
    },
    {
      key: 'generic',
      label: 'Generic name',
      type: 'text',
      required: false,
    },
    {
      key: 'brand',
      label: 'Brand',
      type: 'text',
      required: false,
    },
    {
      key: 'category',
      label: 'Category',
      type: 'text',
      required: false,
    },
    {
      key: 'batch',
      label: 'Batch number',
      type: 'text',
      required: false,
    },
    {
      key: 'expiry',
      label: 'Expiry date',
      type: 'date',
      required: false,
    },
    {
      key: 'purchase',
      label: 'Purchase price',
      type: 'number',
      required: false,
    },
    {
      key: 'price',
      label: 'Selling price',
      type: 'number',
      required: false,
    },
    {
      key: 'stock',
      label: 'Available stock',
      type: 'number',
      required: false,
    },
    {
      key: 'supplier',
      label: 'Supplier',
      type: 'text',
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['name', 'generic', 'brand', 'category'],
};
