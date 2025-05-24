export interface Launch {
  id: string;
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  destination: string;
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
