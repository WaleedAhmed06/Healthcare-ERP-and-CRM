import type { FeatureDefinition } from '@/types/module';
export const departmentsConfig: FeatureDefinition = {
  key: 'departments',
  title: 'Departments',
  group: 'Organization',
  description: 'Organize care teams and departmental services.',
  fields: [
    {
      key: 'name',
      label: 'Department name',
      type: 'text',
      required: true,
    },
    {
      key: 'doctors',
      label: 'Assigned doctors',
      type: 'text',
      required: false,
    },
    {
      key: 'nurses',
      label: 'Assigned nurses',
      type: 'text',
      required: false,
    },
    {
      key: 'timetable',
      label: 'Timetable',
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
  columns: ['name', 'doctors', 'nurses', 'timetable'],
};
