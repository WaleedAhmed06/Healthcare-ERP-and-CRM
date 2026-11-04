import { createEntitySchema } from '@/schemas/entity.schema';
import { documentsConfig } from '../config/documents.config';
export const documentsSchema = createEntitySchema(documentsConfig.fields);
