import { createEntitySchema } from '@/schemas/entity.schema';
import { admissionsConfig } from '../config/admissions.config';
export const admissionsSchema = createEntitySchema(admissionsConfig.fields);
