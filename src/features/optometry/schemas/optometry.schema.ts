import { createEntitySchema } from '@/schemas/entity.schema';
import { optometryConfig } from '../config/optometry.config';
export const optometrySchema = createEntitySchema(optometryConfig.fields);
