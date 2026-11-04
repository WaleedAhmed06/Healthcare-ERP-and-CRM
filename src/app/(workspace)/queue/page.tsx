import { QueueScreen } from '@/features/queue/components/queue-screen';
import { AccessBoundary } from '@/components/shared/access-boundary';
export default function QueuePage() {
  return (
    <AccessBoundary feature="queue">
      <QueueScreen />
    </AccessBoundary>
  );
}
