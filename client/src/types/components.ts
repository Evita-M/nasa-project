import { Launch } from './launch';
import { Planet } from './planet';

export interface LaunchProps {
  planets: Planet[];
  submitLaunch: (values: {
    launchDate: Date;
    mission: string;
    rocket: string;
    destination: string;
  }) => Promise<void>;
  title: string;
  subtitle: string;
}

export interface UpcomingProps {
  launches: Launch[];
  abortLaunch: (id: string) => Promise<void>;
  title: string;
  subtitle: string;
}

export interface HistoryProps {
  launches: Launch[];
  title: string;
  subtitle: string;
}
