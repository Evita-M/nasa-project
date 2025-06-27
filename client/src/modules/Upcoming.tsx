import { FC, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { Button } from '@/components/Button';
import { XIcon } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { Launch, LaunchStatus } from '@/types/launch';

interface UpcomingProps {
  launches: Launch[];
  abortLaunch: (id: string) => void;
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

export const Upcoming: FC<UpcomingProps> = ({
  launches,
  abortLaunch,
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
      fetchLaunches(page + 1, limit, LaunchStatus.UPCOMING, true);
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
      ?.filter((launch) => launch.status === LaunchStatus.UPCOMING)
      .map(
        ({
          flightNumber,
          launchDate,
          missionName,
          rocketName,
          planetName,
          id,
          customers,
        }) => (
          <TableRow key={id}>
            <TableCell>{flightNumber}</TableCell>
            <TableCell>{new Date(launchDate).toDateString()}</TableCell>
            <TableCell>{missionName}</TableCell>
            <TableCell>{rocketName}</TableCell>
            <TableCell>{planetName}</TableCell>
            <TableCell>{customers?.join(', ')}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => abortLaunch(id)}
                className="min-w-auto w-[2rem]"
              >
                <XIcon className="h-6 w-6" color="var(--error)" />
              </Button>
            </TableCell>
          </TableRow>
        )
      );
  }, [launches, abortLaunch]);

  return (
    <>
      {launches.length === 0 ? (
        <div className="flex flex-1 items-center justify-center h-full w-full min-h-[inherit]">
          <EmptyState text="No upcoming missions" />
        </div>
      ) : (
        <div
          style={{
            maxHeight: '500px',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <Table id="upcoming" className="rounded-md border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[3rem]">No.</TableHead>
                <TableHead className="w-[9rem]">Date</TableHead>
                <TableHead>Mission</TableHead>
                <TableHead className="w-[7rem]">Rocket</TableHead>
                <TableHead>Planet</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead className="w-[2rem]"></TableHead>
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
