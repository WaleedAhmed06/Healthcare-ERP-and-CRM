import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { FieldDefinition } from '@/types/module';
import type { Entity, EntityValue } from '@/types/entity';
export function EntityField({
  field,
  value,
  onChange,
  error,
  relations,
}: {
  field: FieldDefinition;
  value: EntityValue;
  onChange: (value: string) => void;
  error?: string;
  relations?: Entity[];
}) {
  const id = `field-${field.key}`;
  const common = {
    id,
    value: String(value ?? ''),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    'aria-invalid': !!error,
    'aria-describedby': error ? id + '-error' : undefined,
    required: field.required,
  };
  return (
    <div className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium">
        {field.label}
        {field.required && <span className="ml-1 text-primary">*</span>}
      </label>
      {field.relation || field.options ? (
        <select {...common} className="h-10 w-full rounded-md border bg-card px-3 text-sm">
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
          {relations?.map((r) => (
            <option key={r.id} value={r.id}>
              {String(r.name || r.id)}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <Textarea {...common} rows={3} />
      ) : (
        <Input
          {...common}
          type={field.type}
          step={field.type === 'number' ? 'any' : undefined}
          min={field.type === 'number' ? 0 : undefined}
        />
      )}{' '}
      {error && (
        <p id={id + '-error'} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
