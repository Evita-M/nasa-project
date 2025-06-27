import { simpleFaker } from '@faker-js/faker';
import LaunchesDatabase from './launches.mongo';
import PlanetsDatabase from './planets.mongo';
import axios from 'axios';
import CustomError from '../utils/CustomError';
import { ERROR_MESSAGES, ERROR_STATUS } from '../utils/error.constants';

interface LaunchPayload {
  missionName: string;
  rocketName: string;
  launchDate: Date;
  planetName: string;
}

export enum LaunchStatus {
  UPCOMING = 'upcoming',
  HISTORY = 'history',
}

interface Launch {
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

const DEFAULT_FLIGHT_NUMBER = 1;

async function findLaunch(filter: any) {
  return await LaunchesDatabase.findOne(filter);
}

async function populateLaunches() {
  console.log('Downloading launch data...');
  const response = await axios.post(process.env.SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log('Problem downloading launch data');
    throw new CustomError(
      ERROR_MESSAGES.LAUNCH_DATA_DOWNLOAD_FAILED,
      ERROR_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch: Launch = {
      id: launchDoc['flight_number'],
      planetName: 'Earth',
      flightNumber: launchDoc['flight_number'],
      missionName: launchDoc['name'],
      rocketName: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      status:
        launchDoc['upcoming'] && launchDoc['date_local'] > new Date()
          ? LaunchStatus.UPCOMING
          : LaunchStatus.HISTORY,
      success: launchDoc['success'],
      customers,
    };

    await saveLaunch(launch);
  }
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

async function getPaginatedLaunches(
  skip: number,
  limit: number,
  status?: LaunchStatus
): Promise<{
  launches: Launch[];
  totalCount: number;
  upcomingCount: number;
  historyCount: number;
}> {
  let filter: any = {};
  if (status === LaunchStatus.UPCOMING) {
    filter.status = LaunchStatus.UPCOMING;
  } else if (status === LaunchStatus.HISTORY) {
    filter.status = LaunchStatus.HISTORY;
  }
  const launchesDocs = await LaunchesDatabase.find(filter, { _id: 0, __v: 0 })
    .skip(skip)
    .limit(limit);
  const launches = launchesDocs.map((doc: any) => ({
    ...doc.toObject(),
    status: doc.status as LaunchStatus,
  }));
  const totalCount = await LaunchesDatabase.countDocuments(filter);
  const upcomingCount = await LaunchesDatabase.countDocuments({
    status: LaunchStatus.UPCOMING,
  });
  const historyCount = await LaunchesDatabase.countDocuments({
    status: LaunchStatus.HISTORY,
  });
  return { launches, totalCount, upcomingCount, historyCount };
}

async function scheduleNewLaunch(launch: LaunchPayload): Promise<Launch> {
  const planet = await PlanetsDatabase.findOne({
    keplerName: launch.planetName,
  });
  if (!planet) {
    throw new CustomError(
      ERROR_MESSAGES.PLANET_NOT_FOUND,
      ERROR_STATUS.NOT_FOUND
    );
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = {
    ...launch,
    id: simpleFaker.string.uuid(),
    flightNumber: newFlightNumber,
    customers: ['NASA'],
    status:
      launch.launchDate > new Date()
        ? LaunchStatus.UPCOMING
        : LaunchStatus.HISTORY,
    success: true,
  };

  await saveLaunch(newLaunch);

  return newLaunch;
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
}

async function abortLaunchById(id: string): Promise<boolean> {
  console.log(id);
  const abortedLaunch = await LaunchesDatabase.updateOne(
    { id },
    { status: LaunchStatus.HISTORY, success: false }
  );
  if (!abortedLaunch) {
    throw new CustomError(
      ERROR_MESSAGES.LAUNCH_NOT_FOUND,
      ERROR_STATUS.NOT_FOUND
    );
  }
  return abortedLaunch.modifiedCount === 1;
}

export {
  getAllLaunches,
  getPaginatedLaunches,
  populateLaunches,
  abortLaunchById,
  scheduleNewLaunch,
  existsLaunchWithId,
  loadLaunchData,
};
