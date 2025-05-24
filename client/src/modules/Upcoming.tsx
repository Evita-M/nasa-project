import { FC, useMemo } from 'react';
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
import { Launch } from '@/types/launch';

interface UpcomingProps {
  launches: Launch[];
  abortLaunch: (id: string) => void;
}

export const Upcoming: FC<UpcomingProps> = ({ launches, abortLaunch }) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.upcoming)
      .map(
        ({
          flightNumber,
          launchDate,
          missionName,
          rocketName,
          planetName,
          id,
        }) => (
          <TableRow key={String(flightNumber)}>
            <TableCell>{flightNumber}</TableCell>
            <TableCell>{new Date(launchDate).toDateString()}</TableCell>
            <TableCell>{missionName}</TableCell>
            <TableCell>{rocketName}</TableCell>
            <TableCell>{planetName}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => abortLaunch(id)}
                className="transition-colors duration-200 hover:bg-red-600 hover:text-white"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        )
      );
  }, [launches, abortLaunch]);

  return (
    <div id="upcoming" className="rounded-md border">
      {launches.length === 0 ? (
        <EmptyState text="No upcoming missions" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[2rem]"></TableHead>
              <TableHead className="w-[3rem]">No.</TableHead>
              <TableHead className="w-[9rem]">Date</TableHead>
              <TableHead>Mission</TableHead>
              <TableHead className="w-[7rem]">Rocket</TableHead>
              <TableHead>Destination</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableBody}</TableBody>
        </Table>
      )}
    </div>
  );
};
