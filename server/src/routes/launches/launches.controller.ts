import { Request, Response } from 'express';
import {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
  ErrorCode,
} from '../../models/launches.models';

export const MESSAGE = {
  MISSING_REQUIRED_PROPERTY: 'Missing required launch property',
  INVALID_LAUNCH_DATE: 'Invalid launch date',
};

// GET all launches
async function httpGetAllLaunches(req: Request, res: Response): Promise<any> {
  try {
    const launches = await getAllLaunches();
    return res.status(200).json(launches);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || 'Internal server error' });
  }
}

// POST new launch
async function httpCreateLaunch(req: Request, res: Response): Promise<any> {
  try {
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

    try {
      const newLaunch = await scheduleNewLaunch(launchData);
      return res.status(201).json(newLaunch);
    } catch (err) {
      if (err.message === ErrorCode.PlanetNotFound)
        return res.status(500).json({ message: 'No matching planet found' });
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || 'Internal server error' });
  }
}

// DELETE launch by id
async function httpAbortLaunch(req: Request, res: Response): Promise<any> {
  try {
    const id = req.params.id;
    const existingLaunch = await existsLaunchWithId(id);
    if (!existingLaunch) {
      return res.status(404).json({
        message: 'Launch not found',
      });
    }
    const aborted = await abortLaunchById(id);
    if (!aborted) {
      return res.status(400).json({
        message: 'Launch not aborted',
      });
    }
    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || 'Internal server error' });
  }
}

export { httpGetAllLaunches, httpCreateLaunch, httpAbortLaunch };
