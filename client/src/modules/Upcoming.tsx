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
              onClick={() => abortLaunch(id)}
              className="min-w-auto w-[2rem]"
            >
              <XIcon className="h-6 w-6" color="var(--error)" />
            </Button>
          </TableCell>
        </TableRow>
      )
    );
  }, [launches]);

  return (
    <>
      {launches.length === 0 ? (
        <div className="flex flex-1 items-center justify-center h-full w-full min-h-[inherit]">
          <EmptyState text="No upcoming missions" />
        </div>
      ) : (
        <Table id="upcoming" className="rounded-md border h-full">
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
      )}
    </>
  );
};
