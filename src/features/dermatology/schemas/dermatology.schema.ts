import { createEntitySchema } from '@/schemas/entity.schema';
import { dermatologyConfig } from '../config/dermatology.config';
export const dermatologySchema = createEntitySchema(dermatologyConfig.fields);
