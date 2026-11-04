import { SettingsScreen } from '@/features/settings/components/settings-screen';
import { AccessBoundary } from '@/components/shared/access-boundary';
export default function SettingsPage() {
  return (
    <AccessBoundary feature="settings">
      <SettingsScreen />
    </AccessBoundary>
  );
}
