import { createEntitySchema } from '@/schemas/entity.schema';
import { departmentsConfig } from '../config/departments.config';
export const departmentsSchema = createEntitySchema(departmentsConfig.fields);
