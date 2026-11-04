import type { FeatureDefinition } from '@/types/module';
export const messagesConfig: FeatureDefinition = {
  key: 'messages',
  title: 'Messages',
  group: 'Workspace',
  description: 'Demo conversations between patients and care teams.',
  fields: [
    {
      key: 'patient',
      label: 'Patient',
      type: 'text',
      relation: 'patients',
      required: true,
    },
    {
      key: 'name',
      label: 'Subject',
      type: 'text',
      required: true,
    },
    {
      key: 'message',
      label: 'Message',
      type: 'textarea',
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
      options: ['Unread', 'Read', 'Replied'],
      required: false,
    },
  ],
  columns: ['patient', 'name', 'message', 'date'],
};
