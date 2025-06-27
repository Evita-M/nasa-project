import { EmptyState } from '@/components/EmptyState';
import { Heading } from '@/components/Heading';
import { Loader } from '@/components/Loader';
import { History } from '@/modules/History';
import { usePaginatedLaunches } from '@/hooks/usePaginatedLaunches';
import { LaunchStatus } from '@/types/launch';

export default function HistoryPage() {
  const { launches, fetchLaunches, isLoading, page, limit, hasMore, count } =
    usePaginatedLaunches(LaunchStatus.HISTORY);

  return (
    <>
      <Heading title="History" subtitle="View the history of all missions" />
      {count === 0 ? (
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
