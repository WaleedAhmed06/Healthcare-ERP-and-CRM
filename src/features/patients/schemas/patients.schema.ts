import { createEntitySchema } from '@/schemas/entity.schema';
import { patientsConfig } from '../config/patients.config';
export const patientsSchema = createEntitySchema(patientsConfig.fields);
