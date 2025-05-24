export interface Launch {
  id: string;
  flightNumber: number;
  missionName: string;
  rocketName: string;
  launchDate: Date;
  planetName: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export interface LaunchPayload {
  missionName: string;
  rocketName: string;
  launchDate: Date;
  planetName: string;
}
