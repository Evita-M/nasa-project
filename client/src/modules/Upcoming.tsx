import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { Button } from '@/components/Button';
import { UpcomingProps } from '@/types/components';
import { XIcon } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export const Upcoming = ({
  launches,
  abortLaunch,
  title,
  subtitle,
}: UpcomingProps) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => launch.upcoming)
      .map((launch) => (
        <TableRow key={String(launch.flightNumber)}>
          <TableCell>{launch.flightNumber}</TableCell>
          <TableCell>{new Date(launch.launchDate).toDateString()}</TableCell>
          <TableCell>{launch.missionName}</TableCell>
          <TableCell>{launch.rocketName}</TableCell>
          <TableCell>{launch.planetName}</TableCell>
          <TableCell>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => abortLaunch(launch.id)}
              className="transition-colors duration-200 hover:bg-red-600 hover:text-white"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ));
  }, [launches, abortLaunch]);

  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg text-white/70">{subtitle}</p>
        </div>
        <div className="rounded-md border">
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
      </div>
    </div>
  );
};
