import { createEntitySchema } from '@/schemas/entity.schema';
import { prescriptionsConfig } from '../config/prescriptions.config';
export const prescriptionsSchema = createEntitySchema(prescriptionsConfig.fields);
