import { createEntitySchema } from '@/schemas/entity.schema';
import { emergencyConfig } from '../config/emergency.config';
export const emergencySchema = createEntitySchema(emergencyConfig.fields);
