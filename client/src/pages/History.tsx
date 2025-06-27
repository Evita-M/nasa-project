import { EmptyState } from '@/components/EmptyState';
import { Heading } from '@/components/Heading';
import { Loader } from '@/components/Loader';
import { History } from '@/modules/History';
import launchesStore from '@/store/launches-store';
import { LaunchStatus } from '@/types/launch';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const {
    launches,
    fetchLaunches,
    totalCount,
    isLoading,
    page,
    limit,
    historyCount,
  } = launchesStore();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLaunches(1, 10, LaunchStatus.HISTORY, false);
  }, [fetchLaunches]);

  useEffect(() => {
    setHasMore(launches.length < totalCount);
  }, [launches.length, totalCount]);

  return (
    <>
      <Heading title="History" subtitle="View the history of all missions" />
      {historyCount === 0 ? (
        isLoading ? (
          <Loader />
        ) : (
          <EmptyState text="No history of missions" />
        )
      ) : (
        <History
          launches={launches}
          isLoading={isLoading}
          hasMore={hasMore}
          page={page}
          limit={limit}
          fetchLaunches={fetchLaunches}
        />
      )}
    </>
  );
}
