import { createEntitySchema } from '@/schemas/entity.schema';
import { messagesConfig } from '../config/messages.config';
export const messagesSchema = createEntitySchema(messagesConfig.fields);
