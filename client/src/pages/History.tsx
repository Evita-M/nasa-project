import { History } from '@/modules/History';
import launchesStore from '@/store/launches-store';

export default function HistoryPage() {
  const { launches } = launchesStore();

  return (
    <History
      launches={launches}
      title="History"
      subtitle="View the history of all missions."
    />
  );
}
