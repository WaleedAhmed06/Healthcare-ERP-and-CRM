import { createEntitySchema } from '@/schemas/entity.schema';
import { organizationsConfig } from '../config/organizations.config';
export const organizationsSchema = createEntitySchema(organizationsConfig.fields);
