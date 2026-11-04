import { createEntitySchema } from '@/schemas/entity.schema';
import { branchesConfig } from '../config/branches.config';
export const branchesSchema = createEntitySchema(branchesConfig.fields);
