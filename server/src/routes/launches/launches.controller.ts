import { Request, Response } from 'express';
import {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
} from '../../models/launches.models';

export const MESSAGE = {
  MISSING_REQUIRED_PROPERTY: 'Missing required launch property',
  INVALID_LAUNCH_DATE: 'Invalid launch date',
};

// GET all launches
function httpGetAllLaunches(req: Request, res: Response): any {
  return res.status(200).json(getAllLaunches());
}

// POST new launch
async function httpCreateLaunch(req: Request, res: Response): Promise<any> {
  const launch = req.body;
  const { missionName, rocketName, launchDate, planetName } = launch;

  if (!missionName || !rocketName || !launchDate || !planetName) {
    return res.status(400).json({
      message: MESSAGE.MISSING_REQUIRED_PROPERTY,
    });
  }

  const parsedLaunchDate = new Date(launchDate);

  if (isNaN(parsedLaunchDate.valueOf())) {
    return res.status(400).json({
      message: MESSAGE.INVALID_LAUNCH_DATE,
    });
  }

  const launchData = {
    missionName,
    rocketName,
    planetName,
    launchDate: parsedLaunchDate,
  };

  const newLaunch = addNewLaunch(launchData);

  return res.status(201).json(newLaunch);
}

// DELETE launch by id
function httpDeleteLaunch(req: Request, res: Response): any {
  const launchId = req.params.id;

  const launchToAbort = deleteLaunchById(launchId);
  return res.status(200).json(launchToAbort);
}

export { httpGetAllLaunches, httpCreateLaunch, httpDeleteLaunch };
