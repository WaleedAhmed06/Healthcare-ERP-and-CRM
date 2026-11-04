import { createEntitySchema } from '@/schemas/entity.schema';
import { pharmacyConfig } from '../config/pharmacy.config';
export const pharmacySchema = createEntitySchema(pharmacyConfig.fields);
