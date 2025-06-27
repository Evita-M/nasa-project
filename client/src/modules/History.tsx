import { useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { EmptyState } from '@/components/EmptyState';
import { FC } from 'react';
import { Launch, LaunchStatus } from '@/types/launch';

interface HistoryProps {
  launches: Launch[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  limit: number;
  fetchLaunches: (
    page?: number,
    limit?: number,
    status?: LaunchStatus,
    append?: boolean
  ) => Promise<void>;
}

export const History: FC<HistoryProps> = ({
  launches,
  isLoading,
  hasMore,
  page,
  limit,
  fetchLaunches,
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll logic
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchLaunches(page + 1, limit, LaunchStatus.HISTORY, true);
    }
  }, [isLoading, hasMore, fetchLaunches, page, limit]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    const node = observerRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [loadMore, hasMore, isLoading]);

  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.status === LaunchStatus.HISTORY)
      .map(
        ({
          id,
          flightNumber,
          launchDate,
          missionName,
          rocketName,
          planetName,
          customers,
          success,
        }) => (
          <TableRow key={id}>
            <TableCell className="w-[3rem]">{flightNumber}</TableCell>
            <TableCell className="w-[9rem]">
              {new Date(launchDate).toDateString()}
            </TableCell>
            <TableCell className="w-[12rem] truncate" title={missionName}>
              {missionName}
            </TableCell>
            <TableCell className="w-[7rem] truncate" title={rocketName}>
              {rocketName}
            </TableCell>
            <TableCell className="w-[10rem] truncate" title={planetName}>
              {planetName}
            </TableCell>
            <TableCell
              className="max-w-[180px] truncate overflow-hidden whitespace-nowrap"
              title={customers?.join(', ')}
            >
              {customers?.join(', ')}
            </TableCell>
            <TableCell>
              <span
                aria-label={success ? 'Success' : 'Failed'}
                className={`inline-block h-3 w-3 rounded-full ${success ? 'bg-green-500' : 'bg-red-500'}`}
              />
            </TableCell>
          </TableRow>
        )
      );
  }, [launches]);

  return (
    <>
      {!isLoading && launches.length === 0 ? (
        <div className="flex flex-1 items-center justify-center h-full w-full min-h-[inherit]">
          <EmptyState text="No upcoming missions" />
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto relative scrollbar-hide">
          <Table id="history" className="rounded-md border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[3rem]">No.</TableHead>
                <TableHead className="w-[9rem]">Date</TableHead>
                <TableHead>Mission</TableHead>
                <TableHead className="w-[7rem]">Rocket</TableHead>
                <TableHead>Planet</TableHead>
                <TableHead className="w-[9rem]">Customers</TableHead>
                <TableHead className="w-[2rem]">Landed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{tableBody}</TableBody>
          </Table>
          <div ref={observerRef} style={{ height: 32 }} />
          {isLoading && <div className="text-center py-2">Loading...</div>}
        </div>
      )}
    </>
  );
};
