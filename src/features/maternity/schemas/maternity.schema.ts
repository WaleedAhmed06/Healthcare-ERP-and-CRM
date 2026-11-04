import { createEntitySchema } from '@/schemas/entity.schema';
import { maternityConfig } from '../config/maternity.config';
export const maternitySchema = createEntitySchema(maternityConfig.fields);
