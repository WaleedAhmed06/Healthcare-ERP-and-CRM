'use client';
import { useState } from 'react';
import { createEntitySchema } from '@/schemas/entity.schema';
import type { Entity, EntityInput } from '@/types/entity';
import type { FieldDefinition } from '@/types/module';
import { today } from '@/lib/format';
export function useEntityForm(fields: FieldDefinition[], record?: Entity) {
  const [values, setValues] = useState<EntityInput>(() =>
    Object.fromEntries(
      fields.map((f) => [
        f.key,
        record?.[f.key] ??
          (f.type === 'number' ? 0 : (f.options?.[0] ?? (f.type === 'date' ? today() : ''))),
      ]),
    ),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  function validate() {
    const parsed = createEntitySchema(fields).safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return null;
    }
    setErrors({});
    return parsed.data as EntityInput;
  }
  return {
    values,
    errors,
    setValue: (key: string, value: string) => setValues((v) => ({ ...v, [key]: value })),
    validate,
  };
}
