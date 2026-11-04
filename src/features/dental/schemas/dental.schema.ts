import { createEntitySchema } from '@/schemas/entity.schema';
import { dentalConfig } from '../config/dental.config';
export const dentalSchema = createEntitySchema(dentalConfig.fields);
