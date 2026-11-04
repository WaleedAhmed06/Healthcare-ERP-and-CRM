import type { FeatureDefinition } from '@/types/module';
export const subscriptionsConfig: FeatureDefinition = {
  key: 'subscriptions',
  title: 'Subscriptions',
  group: 'Platform',
  description: 'Plans, trials and platform billing configuration.',
  fields: [
    {
      key: 'name',
      label: 'Plan name',
      type: 'text',
      required: true,
    },
    {
      key: 'price',
      label: 'Price',
      type: 'number',
      required: false,
    },
    {
      key: 'billing',
      label: 'Billing period',
      type: 'select',
      options: ['Monthly', 'Annual'],
      required: false,
    },
    {
      key: 'users',
      label: 'User limit',
      type: 'number',
      required: false,
    },
    {
      key: 'branches',
      label: 'Branch limit',
      type: 'number',
      required: false,
    },
    {
      key: 'storage',
      label: 'Storage GB',
      type: 'number',
      required: false,
    },
    {
      key: 'access',
      label: 'Included modules',
      type: 'textarea',
      required: false,
    },
    {
      key: 'trial',
      label: 'Trial days',
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
  columns: ['name', 'price', 'billing', 'users'],
};
