import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/Table';
import { Button } from '../components/ui/Button';

interface Launch {
  id: string;
  flightNumber: number;
  launchDate: Date;
  mission: string;
  rocket: string;
  destination: string;
  upcoming: boolean;
}

interface UpcomingProps {
  launches: Launch[];
  abortLaunch: (id: string) => void;
  title: string;
  subtitle: string;
}

const Upcoming = ({
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
          <TableCell>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => abortLaunch(launch.id)}
              className="hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              ✖
            </Button>
          </TableCell>
          <TableCell>{launch.flightNumber}</TableCell>
          <TableCell>{new Date(launch.launchDate).toDateString()}</TableCell>
          <TableCell>{launch.mission}</TableCell>
          <TableCell>{launch.rocket}</TableCell>
          <TableCell>{launch.destination}</TableCell>
        </TableRow>
      ));
  }, [launches, abortLaunch]);

  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg text-white/70">{subtitle}</p>
          <p className="text-red-700 font-medium">
            Warning! Clicking on the ✖ aborts the mission.
          </p>
        </div>

        <div className="rounded-md border">
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
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
