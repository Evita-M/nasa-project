import { useMemo } from 'react';
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
import { Launch } from '@/types/launch';

interface HistoryProps {
  launches: Launch[];
}

export const History: FC<HistoryProps> = ({ launches }) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => !launch.upcoming)
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
            <TableCell>{flightNumber}</TableCell>
            <TableCell>{new Date(launchDate).toDateString()}</TableCell>
            <TableCell>{missionName}</TableCell>
            <TableCell>{rocketName}</TableCell>
            <TableCell>{planetName}</TableCell>
            <TableCell>{customers?.join(', ')}</TableCell>
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
      {launches.length === 0 ? (
        <EmptyState text="No history of missions" />
      ) : (
        <Table id="history" className="rounded-md border h-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[3rem]">No.</TableHead>
              <TableHead className="w-[9rem]">Date</TableHead>
              <TableHead>Mission</TableHead>
              <TableHead className="w-[7rem]">Rocket</TableHead>
              <TableHead>Planet</TableHead>
              <TableHead>Customers</TableHead>
              <TableHead className="w-[2rem]">Landed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableBody}</TableBody>
        </Table>
      )}
    </>
  );
};
