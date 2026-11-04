'use client';
import { featureScreens } from '@/config/feature-screens';
import { canAccess } from '@/config/roles';
import { useSessionStore } from '@/stores/session-store';
export function FeatureGate({ feature }: { feature: string }) {
  const { role, enabledModules } = useSessionStore();
  if (!canAccess(role, feature) || enabledModules[feature] === false)
    return (
      <div className="rounded-xl border bg-white p-8">
        <h1 className="text-xl">This module is unavailable in your current workspace.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Change the demo role or enable the module in Settings.
        </p>
      </div>
    );
  const Screen = featureScreens[feature];
  return Screen ? <Screen /> : null;
}
