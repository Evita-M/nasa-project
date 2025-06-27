import { Heading } from '@/components/Heading';
import { Upcoming } from '@/modules/Upcoming';
import launchesStore from '@/store/launches-store';
import { LaunchStatus } from '@/types/launch';
import { Loader } from '@/components/Loader';
import { useCallback } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { usePaginatedLaunches } from '@/hooks/usePaginatedLaunches';

export default function UpcomingPage() {
  const { launches, fetchLaunches, isLoading, page, limit, hasMore, count } =
    usePaginatedLaunches(LaunchStatus.UPCOMING);
  const { abortLaunch } = launchesStore();

  const handleAbortLaunch = useCallback(
    async (id: string) => {
      await abortLaunch(id);
    },
    [abortLaunch, fetchLaunches]
  );

  return (
    <>
      <Heading title="Upcoming" subtitle="View the upcoming missions" />
      {count === 0 ? (
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
