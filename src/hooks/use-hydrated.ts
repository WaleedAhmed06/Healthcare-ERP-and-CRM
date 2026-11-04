'use client';
import { useSyncExternalStore } from 'react';
import { useSessionStore } from '@/stores/session-store';
const subscribe = (callback: () => void) => useSessionStore.persist.onFinishHydration(callback);
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => useSessionStore.persist.hasHydrated(),
    () => false,
  );
}
