import { createEntitySchema } from '@/schemas/entity.schema';
import { nursingConfig } from '../config/nursing.config';
export const nursingSchema = createEntitySchema(nursingConfig.fields);
