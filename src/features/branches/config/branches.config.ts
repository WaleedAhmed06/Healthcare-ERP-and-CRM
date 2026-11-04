import type { FeatureDefinition } from '@/types/module';
export const branchesConfig: FeatureDefinition = {
  key: 'branches',
  title: 'Branches',
  group: 'Organization',
  description: 'Independent locations. One connected organization.',
  fields: [
    {
      key: 'name',
      label: 'Branch name',
      type: 'text',
      required: true,
    },
    {
      key: 'manager',
      label: 'Branch manager',
      type: 'text',
      required: false,
    },
    {
      key: 'phone',
      label: 'Contact',
      type: 'text',
      required: false,
    },
    {
      key: 'address',
      label: 'Address',
      type: 'text',
      required: false,
    },
    {
      key: 'hours',
      label: 'Opening hours',
      type: 'text',
      required: false,
    },
    {
      key: 'rooms',
      label: 'Rooms',
      type: 'text',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['name', 'manager', 'phone', 'address'],
};
