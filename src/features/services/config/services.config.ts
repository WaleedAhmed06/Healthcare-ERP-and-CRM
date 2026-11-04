import type { FeatureDefinition } from '@/types/module';
export const servicesConfig: FeatureDefinition = {
  key: 'services',
  title: 'Services & pricing',
  group: 'Organization',
  description: 'Your service catalog, available across branches.',
  fields: [
    {
      key: 'name',
      label: 'Service name',
      type: 'text',
      required: true,
    },
    {
      key: 'category',
      label: 'Category',
      type: 'text',
      required: false,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
    },
    {
      key: 'department',
      label: 'Department',
      type: 'text',
      required: false,
    },
    {
      key: 'doctor',
      label: 'Practitioner',
      type: 'text',
      relation: 'staff',
      required: false,
    },
    {
      key: 'duration',
      label: 'Duration minutes',
      type: 'number',
      required: false,
    },
    {
      key: 'price',
      label: 'Price',
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
      key: 'discount',
      label: 'Discount',
      type: 'number',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive'],
      required: false,
    },
  ],
  columns: ['name', 'category', 'description', 'department'],
};
