import { z } from 'zod';
import type { FieldDefinition } from '@/types/module';
export function createEntitySchema(fields: FieldDefinition[]) {
  const shape: Record<string, z.ZodType> = {};
  for (const field of fields) {
    if (field.type === 'number')
      shape[field.key] = z.coerce.number().min(0, 'Must be zero or greater').finite();
    else if (field.type === 'email') shape[field.key] = z.union([z.email(), z.literal('')]);
    else if (field.options?.length)
      shape[field.key] = z.enum(field.options as [string, ...string[]]);
    else
      shape[field.key] = field.required
        ? z.string().trim().min(1, `${field.label} is required`)
        : z.string();
  }
  return z.object(shape);
}
