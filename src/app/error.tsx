'use client';
export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <main className="p-12">
      <h1 className="text-2xl">This view couldn’t load.</h1>
      <p className="my-4 text-muted-foreground">Your saved demo records are retained.</p>
      <button onClick={reset} className="rounded-lg bg-primary px-4 py-2 text-white">
        Try again
      </button>
    </main>
  );
}
