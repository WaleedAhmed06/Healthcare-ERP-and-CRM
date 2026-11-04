import { createEntitySchema } from '@/schemas/entity.schema';
import { expensesConfig } from '../config/expenses.config';
export const expensesSchema = createEntitySchema(expensesConfig.fields);
