import { createEntitySchema } from '@/schemas/entity.schema';
import { physiotherapyConfig } from '../config/physiotherapy.config';
export const physiotherapySchema = createEntitySchema(physiotherapyConfig.fields);
