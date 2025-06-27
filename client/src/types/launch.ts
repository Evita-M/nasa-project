export enum LaunchStatus {
  UPCOMING = 'upcoming',
  HISTORY = 'history',
}

export interface Launch {
  id: string;
  flightNumber: number;
  missionName: string;
  rocketName: string;
  launchDate: Date;
  planetName: string;
  customers: string[];
  status: LaunchStatus;
  success: boolean;
}

export interface LaunchPayload {
  missionName: string;
  rocketName: string;
  launchDate: Date;
  planetName: string;
}
