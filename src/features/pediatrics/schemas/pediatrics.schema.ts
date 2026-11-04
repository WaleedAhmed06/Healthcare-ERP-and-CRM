import { createEntitySchema } from '@/schemas/entity.schema';
import { pediatricsConfig } from '../config/pediatrics.config';
export const pediatricsSchema = createEntitySchema(pediatricsConfig.fields);
