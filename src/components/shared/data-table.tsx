'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import type { Entity } from '@/types/entity';
import type { TableColumn } from '@/types/module';
export function DataTable<T extends Entity>({
  rows,
  columns,
  actions,
  onSelect,
}: {
  rows: T[];
  columns: TableColumn<T>[];
  actions?: (row: T) => React.ReactNode;
  onSelect?: (row: T) => void;
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<string>('');
  const [descending, setDescending] = useState(false);
  const filtered = rows
    .filter((row) => Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort
        ? String(a[sort] || '').localeCompare(String(b[sort] || ''), undefined, { numeric: true }) *
          (descending ? -1 : 1)
        : 0,
    );
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const activePage = Math.min(page, pages - 1);
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
          <Input
            aria-label="Search records"
            className="bg-background/40 pl-9"
            placeholder="Search records…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/60">
              {columns.map((c) => (
                <TableHead key={c.key}>
                  <button
                    className="whitespace-nowrap text-xs"
                    onClick={() => {
                      setSort(c.key);
                      setDescending(sort === c.key && !descending);
                    }}
                  >
                    {c.label}
                    {sort === c.key ? (descending ? ' ↓' : ' ↑') : ''}
                  </button>
                </TableHead>
              ))}
              {actions && <TableHead className="text-right text-xs">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(activePage * 10, activePage * 10 + 10).map((row) => (
              <TableRow key={row.id}>
                {columns.map((c, i) => (
                  <TableCell key={c.key} className="py-4 text-sm">
                    {c.render ? (
                      c.render(row)
                    ) : i === 0 && onSelect ? (
                      <button
                        onClick={() => onSelect(row)}
                        className="font-medium text-primary hover:underline"
                      >
                        {String(row[c.key] ?? '—')}
                      </button>
                    ) : (
                      String(row[c.key] ?? '—')
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <div className="flex justify-end gap-1">{actions(row)}</div>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {!filtered.length && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-36 text-center text-muted-foreground"
                >
                  No records yet. Create a record to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
        <span>
          Page {activePage + 1} of {pages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous page"
            disabled={activePage === 0}
            onClick={() => setPage(activePage - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next page"
            disabled={activePage >= pages - 1}
            onClick={() => setPage(activePage + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
