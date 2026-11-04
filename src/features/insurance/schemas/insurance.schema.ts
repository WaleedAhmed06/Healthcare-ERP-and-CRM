import { createEntitySchema } from '@/schemas/entity.schema';
import { insuranceConfig } from '../config/insurance.config';
export const insuranceSchema = createEntitySchema(insuranceConfig.fields);
