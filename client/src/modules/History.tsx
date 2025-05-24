import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { HistoryProps } from '@/types/components';
import { EmptyState } from '@/components/EmptyState';

export const History = ({ launches, title, subtitle }: HistoryProps) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => !launch.upcoming)
      .map((launch) => (
        <TableRow key={String(launch.flightNumber)}>
          <TableCell>
            <span
              className={`inline-block h-3 w-3 rounded-full ${
                launch.success ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </TableCell>
          <TableCell>{launch.flightNumber}</TableCell>
          <TableCell>{new Date(launch.launchDate).toDateString()}</TableCell>
          <TableCell>{launch.missionName}</TableCell>
          <TableCell>{launch.rocketName}</TableCell>
          <TableCell>{launch.customers?.join(', ')}</TableCell>
        </TableRow>
      ));
  }, [launches]);

  return (
    <article id="history">
      <div className="flex flex-col space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg text-white/70">{subtitle}</p>
        </div>
        <div className="rounded-md border">
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
      </div>
    </article>
  );
};
