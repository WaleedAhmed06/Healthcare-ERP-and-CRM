import type { FeatureDefinition } from '@/types/module';
export const equipmentConfig: FeatureDefinition = {
  key: 'equipment',
  title: 'Equipment',
  group: 'Operations',
  description: 'Asset availability and planned maintenance.',
  fields: [
    {
      key: 'name',
      label: 'Equipment name',
      type: 'text',
      required: true,
    },
    {
      key: 'serial',
      label: 'Serial number',
      type: 'text',
      required: false,
    },
    {
      key: 'department',
      label: 'Department',
      type: 'text',
      required: false,
    },
    {
      key: 'purchaseDate',
      label: 'Purchase date',
      type: 'date',
      required: false,
    },
    {
      key: 'maintenance',
      label: 'Last maintenance',
      type: 'date',
      required: false,
    },
    {
      key: 'nextService',
      label: 'Next service',
      type: 'date',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Available', 'In Use', 'Maintenance', 'Retired'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['name', 'serial', 'department', 'purchaseDate'],
};
