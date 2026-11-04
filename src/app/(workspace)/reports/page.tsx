import { ReportsScreen } from '@/features/reports/components/reports-screen';
import { AccessBoundary } from '@/components/shared/access-boundary';
export default function ReportsPage() {
  return (
    <AccessBoundary feature="reports">
      <ReportsScreen />
    </AccessBoundary>
  );
}
