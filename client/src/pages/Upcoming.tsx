import { Heading } from '@/components/Heading';
import { Upcoming } from '@/modules/Upcoming';
import launchesStore from '@/store/launches-store';
import { LaunchStatus } from '@/types/launch';
import { Loader } from '@/components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { EmptyState } from '@/components/EmptyState';

export default function UpcomingPage() {
  const {
    launches,
    abortLaunch,
    fetchLaunches,
    totalCount,
    isLoading,
    page,
    limit,
    upcomingCount,
  } = launchesStore();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLaunches(1, 10, LaunchStatus.UPCOMING, false);
  }, [fetchLaunches]);

  useEffect(() => {
    setHasMore(launches.length < totalCount);
  }, [launches.length, totalCount]);

  const handleAbortLaunch = useCallback(
    async (id: string) => {
      await abortLaunch(id);
    },
    [abortLaunch, fetchLaunches]
  );

  return (
    <>
      <Heading title="Upcoming" subtitle="View the upcoming missions" />
      {upcomingCount === 0 ? (
        isLoading ? (
          <Loader />
        ) : (
          <EmptyState text="No upcoming missions" />
        )
      ) : (
        <Upcoming
          abortLaunch={handleAbortLaunch}
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
