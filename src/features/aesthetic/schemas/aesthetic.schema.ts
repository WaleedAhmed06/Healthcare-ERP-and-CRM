import { createEntitySchema } from '@/schemas/entity.schema';
import { aestheticConfig } from '../config/aesthetic.config';
export const aestheticSchema = createEntitySchema(aestheticConfig.fields);
