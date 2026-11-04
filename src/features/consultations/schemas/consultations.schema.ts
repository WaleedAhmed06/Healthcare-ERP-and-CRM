import { createEntitySchema } from '@/schemas/entity.schema';
import { consultationsConfig } from '../config/consultations.config';
export const consultationsSchema = createEntitySchema(consultationsConfig.fields);
