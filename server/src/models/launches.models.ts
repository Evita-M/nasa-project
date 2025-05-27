import { simpleFaker } from '@faker-js/faker';
const launches = new Map();

interface LaunchPayload {
  missionName: string;
  rocketName: string;
  launchDate: Date;
  planetName: string;
}

interface Launch {
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

let latestFlightNumber = 100;

const launch = {
  id: simpleFaker.string.uuid(),
  flightNumber: 100,
  missionName: 'Kepler Exploration X',
  rocketName: 'Explorer IS1',
  launchDate: new Date('December 27, 2028'),
  planetName: 'Kepler-186 f',
  customers: ['NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches(): Launch[] {
  return Array.from(launches.values());
}

function addNewLaunch(launch: LaunchPayload): void {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      id: simpleFaker.string.uuid(),
      flightNumber: latestFlightNumber,
      customers: ['NASA'],
      upcoming: true,
      success: true,
    })
  );
}

function deleteLaunchById(id: string): Launch | null {
  const aborted = launches.get(id);
  if (!aborted) {
    return null;
  }
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

export { getAllLaunches, addNewLaunch, deleteLaunchById };
