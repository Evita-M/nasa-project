import { Request, Response } from 'express';
import {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
} from '../../models/launches.models';

// GET all launches
function httpGetAllLaunches(req: Request, res: Response): any {
  return res.status(200).json(getAllLaunches());
}

// POST new launch
function httpCreateLaunch(req: Request, res: Response): any {
  const { missionName, rocketName, launchDate, planetName } = req.body;

  if (!missionName || !rocketName || !launchDate || !planetName) {
    return res.status(400).json({
      message: 'Missing required launch property',
    });
  }

  addNewLaunch({
    ...req.body,
    launchDate: new Date(launchDate),
  });
  return res.status(201).json({
    message: 'Launch created successfully',
  });
}

// DELETE launch by id
function httpDeleteLaunch(req: Request, res: Response): any {
  const launchId = req.params.id;

  const launchToAbort = deleteLaunchById(launchId);
  return res.status(200).json(launchToAbort);
}

export { httpGetAllLaunches, httpCreateLaunch, httpDeleteLaunch };
