export const roles = [
  'Super Admin',
  'Organization Owner',
  'Facility Administrator',
  'Receptionist',
  'Doctor',
  'Nurse',
  'Dentist',
  'Aesthetic Practitioner',
  'Lab Technician',
  'Pharmacist',
  'Accountant',
  'Patient',
  'Hospital Manager',
] as const;
export type Role = (typeof roles)[number];
const clinical = [
  'dashboard',
  'patients',
  'appointments',
  'consultations',
  'prescriptions',
  'plans',
  'laboratory',
  'documents',
  'messages',
  'reports',
];
const access: Partial<Record<Role, string[]>> = {
  Receptionist: [
    'dashboard',
    'patients',
    'appointments',
    'queue',
    'invoices',
    'documents',
    'messages',
  ],
  Doctor: clinical,
  Dentist: [...clinical, 'dental'],
  'Aesthetic Practitioner': [...clinical, 'aesthetic', 'dermatology'],
  Nurse: ['dashboard', 'patients', 'nursing', 'admissions', 'documents', 'messages'],
  'Lab Technician': ['dashboard', 'laboratory', 'documents'],
  Pharmacist: ['dashboard', 'pharmacy', 'inventory', 'invoices'],
  Accountant: ['dashboard', 'invoices', 'insurance', 'expenses', 'reports'],
  Patient: [
    'dashboard',
    'appointments',
    'consultations',
    'prescriptions',
    'plans',
    'laboratory',
    'invoices',
    'documents',
    'messages',
    'aesthetic',
  ],
};
export function canAccess(role: Role, key: string) {
  if (key === 'organizations' || key === 'subscriptions') return role === 'Super Admin';
  return !access[role] || access[role]!.includes(key);
}
