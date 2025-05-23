const { simpleFaker } = require('@faker-js/faker');
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  id: simpleFaker.string.uuid(),
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2028'),
  destination: 'Kepler-186 f',
  customers: ['NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
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

function deleteLaunchById(id) {
  const aborted = launches.get(id);
  if (!aborted) {
    return null;
  }
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
};
