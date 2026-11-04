import { createEntitySchema } from '@/schemas/entity.schema';
import { subscriptionsConfig } from '../config/subscriptions.config';
export const subscriptionsSchema = createEntitySchema(subscriptionsConfig.fields);
