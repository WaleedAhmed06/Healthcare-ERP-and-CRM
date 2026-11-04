import { patientsConfig } from '@/features/patients/config/patients.config';
import { appointmentsConfig } from '@/features/appointments/config/appointments.config';
import { consultationsConfig } from '@/features/consultations/config/consultations.config';
import { prescriptionsConfig } from '@/features/prescriptions/config/prescriptions.config';
import { plansConfig } from '@/features/plans/config/plans.config';
import { nursingConfig } from '@/features/nursing/config/nursing.config';
import { invoicesConfig } from '@/features/invoices/config/invoices.config';
import { insuranceConfig } from '@/features/insurance/config/insurance.config';
import { expensesConfig } from '@/features/expenses/config/expenses.config';
import { aestheticConfig } from '@/features/aesthetic/config/aesthetic.config';
import { dermatologyConfig } from '@/features/dermatology/config/dermatology.config';
import { dentalConfig } from '@/features/dental/config/dental.config';
import { admissionsConfig } from '@/features/admissions/config/admissions.config';
import { emergencyConfig } from '@/features/emergency/config/emergency.config';
import { theatreConfig } from '@/features/theatre/config/theatre.config';
import { laboratoryConfig } from '@/features/laboratory/config/laboratory.config';
import { pharmacyConfig } from '@/features/pharmacy/config/pharmacy.config';
import { physiotherapyConfig } from '@/features/physiotherapy/config/physiotherapy.config';
import { optometryConfig } from '@/features/optometry/config/optometry.config';
import { maternityConfig } from '@/features/maternity/config/maternity.config';
import { pediatricsConfig } from '@/features/pediatrics/config/pediatrics.config';
import { documentsConfig } from '@/features/documents/config/documents.config';
import { inventoryConfig } from '@/features/inventory/config/inventory.config';
import { purchasesConfig } from '@/features/purchases/config/purchases.config';
import { equipmentConfig } from '@/features/equipment/config/equipment.config';
import { staffConfig } from '@/features/staff/config/staff.config';
import { hrConfig } from '@/features/hr/config/hr.config';
import { branchesConfig } from '@/features/branches/config/branches.config';
import { departmentsConfig } from '@/features/departments/config/departments.config';
import { servicesConfig } from '@/features/services/config/services.config';
import { organizationsConfig } from '@/features/organizations/config/organizations.config';
import { subscriptionsConfig } from '@/features/subscriptions/config/subscriptions.config';
import { messagesConfig } from '@/features/messages/config/messages.config';
export const features = [
  patientsConfig,
  appointmentsConfig,
  consultationsConfig,
  prescriptionsConfig,
  plansConfig,
  nursingConfig,
  invoicesConfig,
  insuranceConfig,
  expensesConfig,
  aestheticConfig,
  dermatologyConfig,
  dentalConfig,
  admissionsConfig,
  emergencyConfig,
  theatreConfig,
  laboratoryConfig,
  pharmacyConfig,
  physiotherapyConfig,
  optometryConfig,
  maternityConfig,
  pediatricsConfig,
  documentsConfig,
  inventoryConfig,
  purchasesConfig,
  equipmentConfig,
  staffConfig,
  hrConfig,
  branchesConfig,
  departmentsConfig,
  servicesConfig,
  organizationsConfig,
  subscriptionsConfig,
  messagesConfig,
];
export const featureByKey = Object.fromEntries(features.map((feature) => [feature.key, feature]));
