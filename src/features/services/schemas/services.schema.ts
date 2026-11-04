import { createEntitySchema } from '@/schemas/entity.schema';
import { servicesConfig } from '../config/services.config';
export const servicesSchema = createEntitySchema(servicesConfig.fields);
