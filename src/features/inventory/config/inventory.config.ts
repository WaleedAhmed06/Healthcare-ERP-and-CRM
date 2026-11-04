import type { FeatureDefinition } from '@/types/module';
export const inventoryConfig: FeatureDefinition = {
  key: 'inventory',
  title: 'Inventory',
  group: 'Operations',
  description: 'Supplies, batches and stock movement across locations.',
  fields: [
    {
      key: 'name',
      label: 'Product name',
      type: 'text',
      required: true,
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        'Medical',
        'Surgical',
        'Dental',
        'Aesthetic',
        'Laboratory',
        'Medicines',
        'Office',
        'Equipment',
      ],
      required: false,
    },
    {
      key: 'stock',
      label: 'Available stock',
      type: 'number',
      required: false,
    },
    {
      key: 'minimum',
      label: 'Reorder level',
      type: 'number',
      required: false,
    },
    {
      key: 'batch',
      label: 'Batch',
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
      key: 'price',
      label: 'Unit cost',
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
  columns: ['name', 'category', 'stock', 'minimum'],
};
