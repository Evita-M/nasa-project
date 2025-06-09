import { simpleFaker } from '@faker-js/faker';
import LaunchesDatabase from './launches.mongo';
import PlanetsDatabase from './planets.mongo';

enum ErrorCode {
  PlanetNotFound = 'PlanetNotFound',
}

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

const DEFAULT_FLIGHT_NUMBER = 1;

async function findLaunch(filter: any) {
  return await LaunchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId: string) {
  const launch = await findLaunch({ id: launchId });
  if (!launch) return false;
  return true;
}

async function saveLaunch(launch: Launch) {
  await LaunchesDatabase.findOneAndUpdate({ id: launch.id }, launch, {
    upsert: true,
  });
}

async function getLatestFlightNumber(): Promise<number> {
  const latestLaunch = await LaunchesDatabase.findOne().sort('-flightNumber');
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches(): Promise<Launch[]> {
  return await LaunchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function scheduleNewLaunch(launch: LaunchPayload): Promise<Launch> {
  const planet = await PlanetsDatabase.findOne({
    keplerName: launch.planetName,
  });
  if (!planet) {
    throw new Error(ErrorCode.PlanetNotFound);
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = {
    ...launch,
    id: simpleFaker.string.uuid(),
    flightNumber: newFlightNumber,
    customers: ['NASA'],
    upcoming: true,
    success: true,
  };

  await saveLaunch(newLaunch);

  return newLaunch;
}

async function abortLaunchById(id: string): Promise<boolean> {
  console.log(id);
  const abortedLaunch = await LaunchesDatabase.updateOne(
    { id },
    { upcoming: false, success: false }
  );
  console.log(abortedLaunch);
  console.log(await LaunchesDatabase.find({ id }));
  return abortedLaunch.modifiedCount === 1;
}

export {
  getAllLaunches,
  abortLaunchById,
  scheduleNewLaunch,
  existsLaunchWithId,
  ErrorCode,
};
