import type { FeatureDefinition } from '@/types/module';
export const hrConfig: FeatureDefinition = {
  key: 'hr',
  title: 'HR & shifts',
  group: 'Organization',
  description: 'Attendance, leave and payroll summaries.',
  fields: [
    {
      key: 'employee',
      label: 'Employee',
      type: 'text',
      relation: 'staff',
      required: false,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      required: false,
    },
    {
      key: 'shift',
      label: 'Shift',
      type: 'select',
      options: ['Morning', 'Evening', 'Night'],
      required: false,
    },
    {
      key: 'attendance',
      label: 'Attendance',
      type: 'select',
      options: ['Present', 'Absent', 'Leave'],
      required: false,
    },
    {
      key: 'leaveType',
      label: 'Leave type',
      type: 'text',
      required: false,
    },
    {
      key: 'salary',
      label: 'Salary / payroll',
      type: 'number',
      required: false,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Pending', 'Approved', 'Rejected', 'Paid'],
      required: false,
    },
    {
      key: 'notes',
      label: 'Notes',
      type: 'textarea',
      required: false,
    },
  ],
  columns: ['employee', 'date', 'shift', 'attendance'],
};
