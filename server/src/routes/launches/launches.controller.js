const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
} = require('../../models/launches.models');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.missionName ||
    !launch.rocketName ||
    !launch.launchDate ||
    !launch.planetName
  ) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = req.params.id;
  console.log(launchId);
  const launchToAbort = deleteLaunchById(launchId);
  return res.status(200).json(launchToAbort);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
