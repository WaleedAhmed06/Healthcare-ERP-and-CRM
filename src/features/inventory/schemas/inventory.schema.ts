import { createEntitySchema } from '@/schemas/entity.schema';
import { inventoryConfig } from '../config/inventory.config';
export const inventorySchema = createEntitySchema(inventoryConfig.fields);
