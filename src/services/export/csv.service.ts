import type { Entity } from '@/types/entity';
export function downloadText(name: string, content: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}
export function exportCsv(name: string, rows: Entity[]) {
  const keys = Array.from(new Set(rows.flatMap(Object.keys)));
  const escape = (value: unknown) => {
    let text = String(value ?? '');
    if (/^[=+@\-\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  downloadText(
    `${name}.csv`,
    [keys.map(escape).join(','), ...rows.map((r) => keys.map((k) => escape(r[k])).join(','))].join(
      '\r\n',
    ),
    'text/csv;charset=utf-8',
  );
}
