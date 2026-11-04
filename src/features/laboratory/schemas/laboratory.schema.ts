import { createEntitySchema } from '@/schemas/entity.schema';
import { laboratoryConfig } from '../config/laboratory.config';
export const laboratorySchema = createEntitySchema(laboratoryConfig.fields);
