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
          flightNumber,
          launchDate,
          missionName,
          rocketName,
          customers,
          success,
        }) => (
          <TableRow key={String(flightNumber)}>
            <TableCell>
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  success ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </TableCell>
            <TableCell>{flightNumber}</TableCell>
            <TableCell>{new Date(launchDate).toDateString()}</TableCell>
            <TableCell>{missionName}</TableCell>
            <TableCell>{rocketName}</TableCell>
            <TableCell>{customers?.join(', ')}</TableCell>
          </TableRow>
        )
      );
  }, [launches]);

  return (
    <div id="history" className="rounded-md border">
      {launches.length === 0 ? (
        <EmptyState text="No history of missions" />
      ) : (
        <Table className="rounded-md border h-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[2rem]"></TableHead>
              <TableHead className="w-[3rem]">No.</TableHead>
              <TableHead className="w-[9rem]">Date</TableHead>
              <TableHead>Mission</TableHead>
              <TableHead className="w-[7rem]">Rocket</TableHead>
              <TableHead>Customers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableBody}</TableBody>
        </Table>
      )}
    </div>
  );
};
