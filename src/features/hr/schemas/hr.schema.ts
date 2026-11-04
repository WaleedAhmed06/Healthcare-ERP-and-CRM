import { createEntitySchema } from '@/schemas/entity.schema';
import { hrConfig } from '../config/hr.config';
export const hrSchema = createEntitySchema(hrConfig.fields);
