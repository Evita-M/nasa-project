import { useMemo, useRef, useCallback } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
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

export const Upcoming = ({
  launches,
  abortLaunch,
  isLoading,
  hasMore,
  page,
  limit,
  fetchLaunches,
}: UpcomingProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchLaunches(page + 1, limit, LaunchStatus.UPCOMING, true);
    }
  }, [isLoading, hasMore, fetchLaunches, page, limit]);

  useInfiniteScroll(observerRef, loadMore, hasMore, isLoading);

  const tableBody = useMemo(() => {
    return launches.map(
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
              aria-label="Abort launch"
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
        <EmptyState text="No upcoming missions" />
      ) : (
        <div className="overflow-y-auto relative scrollbar-hide">
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
            <TableBody>
              {tableBody}
              <TableRow>
                <TableCell colSpan={7} className="text-center p-0">
                  <div ref={observerRef} />
                  {isLoading && (
                    <div className="text-center py-4">Loading...</div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};
