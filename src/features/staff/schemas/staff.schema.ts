import { createEntitySchema } from '@/schemas/entity.schema';
import { staffConfig } from '../config/staff.config';
export const staffSchema = createEntitySchema(staffConfig.fields);
