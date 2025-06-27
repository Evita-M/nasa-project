import { Heading } from '@/components/Heading';
import { History } from '@/modules/History';
import launchesStore from '@/store/launches-store';
import { LaunchStatus } from '@/types/launch';
import { useEffect } from 'react';

export default function HistoryPage() {
  const { launches, fetchLaunches } = launchesStore();

  useEffect(() => {
    fetchLaunches(1, 10, LaunchStatus.HISTORY);
  }, [fetchLaunches]);

  return (
    <>
      <Heading
        title="History"
        subtitle="View the history of all missions."
        className="mb-6"
      />
      <History launches={launches} />
    </>
  );
}
