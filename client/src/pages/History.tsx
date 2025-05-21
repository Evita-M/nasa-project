import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/Table';

interface Launch {
  flightNumber: number;
  launchDate: string;
  mission: string;
  rocket: string;
  customers?: string[];
  success: boolean;
  upcoming: boolean;
}

interface HistoryProps {
  launches?: Launch[];
  title: string;
  subtitle: string;
}

const History = ({ launches, title, subtitle }: HistoryProps) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter((launch) => !launch.upcoming)
      .map((launch) => (
        <TableRow key={String(launch.flightNumber)}>
          <TableCell>
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                launch.success ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </TableCell>
          <TableCell>{launch.flightNumber}</TableCell>
          <TableCell>{new Date(launch.launchDate).toDateString()}</TableCell>
          <TableCell>{launch.mission}</TableCell>
          <TableCell>{launch.rocket}</TableCell>
          <TableCell>{launch.customers?.join(', ')}</TableCell>
        </TableRow>
      ));
  }, [launches]);

  return (
    <article id="history" className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg text-white/70 mb-6">{subtitle}</p>
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
                <TableHead>Customers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{tableBody}</TableBody>
          </Table>
        </div>
      </div>
    </article>
  );
};

export default History;
