'use client';
import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useEntities } from '@/hooks/use-entities';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { today } from '@/lib/format';
export function DocumentUpload() {
  const input = useRef<HTMLInputElement>(null);
  const documents = useEntities('documents');
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-dashed bg-white p-5">
      <Upload className="size-5 text-primary" />
      <div className="flex-1">
        <p className="text-sm font-medium">Add a sample document</p>
        <p className="text-xs text-muted-foreground">
          Metadata only · No real patient information · Link it to a patient using Edit.
        </p>
      </div>
      <input
        ref={input}
        hidden
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.txt"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (file.size > 5_000_000) {
            toast.error('Choose a sample file smaller than 5 MB.');
            return;
          }
          await documents.create.mutateAsync({
            name: file.name,
            category: 'Medical report',
            date: today(),
            notes: `Simulated upload: ${file.type}, ${file.size} bytes. File contents are not stored.`,
          });
          e.target.value = '';
        }}
      />
      <Button variant="outline" onClick={() => input.current?.click()}>
        Choose sample file
      </Button>
    </div>
  );
}
