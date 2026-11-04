import { createEntitySchema } from '@/schemas/entity.schema';
import { appointmentsConfig } from '../config/appointments.config';
export const appointmentsSchema = createEntitySchema(appointmentsConfig.fields);
