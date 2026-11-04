import { createEntitySchema } from '@/schemas/entity.schema';
import { purchasesConfig } from '../config/purchases.config';
export const purchasesSchema = createEntitySchema(purchasesConfig.fields);
