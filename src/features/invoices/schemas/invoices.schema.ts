import { createEntitySchema } from '@/schemas/entity.schema';
import { invoicesConfig } from '../config/invoices.config';
export const invoicesSchema = createEntitySchema(invoicesConfig.fields);
