'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEntityForm } from '@/hooks/use-entity-form';
import { useRelations } from '@/hooks/use-relations';
import { EntityField } from './entity-field';
import type { Entity, EntityInput } from '@/types/entity';
import type { FeatureDefinition } from '@/types/module';
export function EntityEditor({
  definition,
  record,
  onClose,
  onSave,
}: {
  definition: FeatureDefinition;
  record?: Entity;
  onClose: () => void;
  onSave: (input: EntityInput) => Promise<unknown>;
}) {
  const form = useEntityForm(definition.fields, record);
  const relations = useRelations(
    definition.fields.flatMap((f) => (f.relation ? [f.relation] : [])),
  );
  const [pending, setPending] = useState(false);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !pending) onClose();
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {record ? 'Edit' : 'New'} {definition.title.toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            Fictional demonstration data · Changes are saved in this browser.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const input = form.validate();
            if (!input) return;
            setPending(true);
            try {
              await onSave(input);
              onClose();
            } catch {
              /* mutation displays error */
            } finally {
              setPending(false);
            }
          }}
        >
          <div className="grid gap-5 py-4 sm:grid-cols-2">
            {definition.fields.map((field) => (
              <EntityField
                key={field.key}
                field={field}
                value={form.values[field.key]}
                onChange={(v) => form.setValue(field.key, v)}
                error={form.errors[field.key]}
                relations={field.relation ? relations[field.relation] : undefined}
              />
            ))}
          </div>
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
              Cancel
            </Button>
            <Button disabled={pending}>{pending ? 'Saving…' : 'Save record'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
