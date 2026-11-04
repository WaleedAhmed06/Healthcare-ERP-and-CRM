import { createEntitySchema } from '@/schemas/entity.schema';
import { equipmentConfig } from '../config/equipment.config';
export const equipmentSchema = createEntitySchema(equipmentConfig.fields);
