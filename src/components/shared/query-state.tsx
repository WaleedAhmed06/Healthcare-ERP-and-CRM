import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
export function QueryState({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: Error | null;
  retry: () => void;
}) {
  if (loading)
    return (
      <div className="space-y-4 rounded-xl bg-white p-6">
        {[1, 2, 3, 4].map((n) => (
          <Skeleton className="h-12 w-full" key={n} />
        ))}
      </div>
    );
  if (error)
    return (
      <div className="rounded-xl border bg-white p-8">
        <p className="mb-4 text-destructive">{error.message}</p>
        <Button variant="outline" onClick={retry}>
          Try again
        </Button>
      </div>
    );
  return null;
}
