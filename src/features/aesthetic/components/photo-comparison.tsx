'use client';
import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
export function PhotoComparison() {
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');
  const [split, setSplit] = useState(50);
  async function load(file: File | undefined, set: (value: string) => void) {
    if (!file) return;
    if (file.size > 1_000_000 || !file.type.startsWith('image/')) {
      toast.error('Use a fictional sample image under 1 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set(String(reader.result));
    reader.readAsDataURL(file);
  }
  return (
    <section className="mb-6 rounded-xl border bg-white p-5">
      <div className="mb-4">
        <h2 className="text-sm font-medium">Before & after comparison</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Private demo preview only · Use fictional images · Images stay in memory and clear on
          navigation.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ['Before', before, setBefore],
          ['After', after, setAfter],
        ].map(([label, url, set]) => (
          <label
            key={String(label)}
            className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-background p-4 text-xs"
          >
            <ImagePlus className="size-5 text-primary" />
            {String(label)} sample
            <input
              className="max-w-full text-[10px]"
              type="file"
              accept="image/*"
              onChange={(e) => load(e.target.files?.[0], set as (v: string) => void)}
            />
            {url && <span className="text-emerald-700">Image ready</span>}
          </label>
        ))}
      </div>
      {before && after && (
        <>
          <div
            role="img"
            aria-label="Before and after photo comparison"
            className="relative mt-4 h-64 overflow-hidden rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${after})` }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${before})`,
                clipPath: `inset(0 ${100 - split}% 0 0)`,
              }}
            />
            <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: split + '%' }} />
            <span className="absolute top-3 left-3 rounded bg-white px-2 py-1 text-xs">Before</span>
            <span className="absolute top-3 right-3 rounded bg-white px-2 py-1 text-xs">After</span>
          </div>
          <input
            aria-label="Photo comparison position"
            className="mt-3 w-full accent-primary"
            type="range"
            min="0"
            max="100"
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
          />
        </>
      )}
    </section>
  );
}
