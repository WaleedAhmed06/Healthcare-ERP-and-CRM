import type { FeatureDefinition } from '@/types/module';
export const expensesConfig: FeatureDefinition = {
  key: 'expenses',
  title: 'Expenses',
  group: 'Finance',
  description: 'Track the cost of running your facility.',
  fields: [
    {
      key: 'name',
      label: 'Expense name',
      type: 'text',
      required: true,
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      options: [
        'Salaries',
        'Rent',
        'Utilities',
        'Supplies',
        'Equipment',
        'Maintenance',
        'Marketing',
        'Other',
      ],
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
      key: 'receipt',
      label: 'Receipt reference',
      type: 'text',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Pending', 'Paid'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['name', 'category', 'amount', 'date'],
};
