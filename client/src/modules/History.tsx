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
import { EmptyState } from '@/components/EmptyState';
import { Launch, LaunchStatus } from '@/types/launch';
import { StatusIndicator } from '@/components/StatusIndicator';

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

export const History = ({
  launches,
  isLoading,
  hasMore,
  page,
  limit,
  fetchLaunches,
}: HistoryProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchLaunches(page + 1, limit, LaunchStatus.HISTORY, true);
    }
  }, [isLoading, hasMore, fetchLaunches, page, limit]);

  useInfiniteScroll(observerRef, loadMore, hasMore, isLoading);

  const tableBody = useMemo(() => {
    return launches.map(
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
            <StatusIndicator success={success} />
          </TableCell>
        </TableRow>
      )
    );
  }, [launches]);

  return (
    <>
      {!isLoading && launches.length === 0 ? (
        <EmptyState text="No upcoming missions" />
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
                <TableHead className="max-w-[180px] truncate overflow-hidden whitespace-nowrap">
                  Customers
                </TableHead>
                <TableHead className="w-[2rem]">Landed</TableHead>
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
