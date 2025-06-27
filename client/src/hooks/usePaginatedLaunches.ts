import { useEffect, useState } from 'react';
import launchesStore from '@/store/launches-store';
import { LaunchStatus } from '@/types/launch';

export function usePaginatedLaunches(status: LaunchStatus) {
  const {
    launches,
    fetchLaunches,
    totalCount,
    isLoading,
    page,
    limit,
    historyCount,
    upcomingCount,
  } = launchesStore();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLaunches(1, 20, status, false);
  }, [fetchLaunches, status]);

  useEffect(() => {
    setHasMore(launches.length < totalCount);
  }, [launches.length, totalCount]);

  const count = status === LaunchStatus.HISTORY ? historyCount : upcomingCount;

  return {
    launches,
    fetchLaunches,
    isLoading,
    page,
    limit,
    hasMore,
    count,
  };
}
