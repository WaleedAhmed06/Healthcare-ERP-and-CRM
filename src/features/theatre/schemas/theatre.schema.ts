import { createEntitySchema } from '@/schemas/entity.schema';
import { theatreConfig } from '../config/theatre.config';
export const theatreSchema = createEntitySchema(theatreConfig.fields);
