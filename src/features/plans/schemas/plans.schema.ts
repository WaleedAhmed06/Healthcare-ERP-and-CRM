import { createEntitySchema } from '@/schemas/entity.schema';
import { plansConfig } from '../config/plans.config';
export const plansSchema = createEntitySchema(plansConfig.fields);
