import { Request, Response } from 'express';
import {
  getPaginatedLaunches,
  abortLaunchById,
  existsLaunchWithId,
  LaunchStatus,
  scheduleNewLaunch,
} from '../../models/launches.models';
import CustomError from '../../utils/CustomError';
import { ERROR_MESSAGES, ERROR_STATUS } from '../../utils/error.constants';

// GET all launches
async function httpGetAllLaunches(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;
    const { launches, totalCount, upcomingCount, historyCount } =
      await getPaginatedLaunches(skip, limitNum, status as LaunchStatus);
    return res
      .status(ERROR_STATUS.OK)
      .json({ launches, totalCount, upcomingCount, historyCount });
  } catch (err) {
    next(err);
  }
}

// POST new launch
async function httpCreateLaunch(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const launch = req.body;
    const { missionName, rocketName, launchDate, planetName } = launch;

    if (!missionName || !rocketName || !launchDate || !planetName) {
      return res.status(ERROR_STATUS.BAD_REQUEST).json({
        message: ERROR_MESSAGES.MISSING_REQUIRED_PROPERTY,
      });
    }

    const parsedLaunchDate = new Date(launchDate);
    if (isNaN(parsedLaunchDate.getTime())) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_LAUNCH_DATE,
        ERROR_STATUS.BAD_REQUEST
      );
    }

    const newLaunch = await scheduleNewLaunch({
      missionName,
      rocketName,
      launchDate: parsedLaunchDate,
      planetName,
    });
    return res.status(ERROR_STATUS.CREATED).json(newLaunch);
  } catch (err) {
    next(err);
  }
}

// DELETE launch by id
async function httpAbortLaunch(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const id = req.params.id;
    const existingLaunch = await existsLaunchWithId(id);
    if (!existingLaunch) {
      throw new CustomError(
        ERROR_MESSAGES.LAUNCH_NOT_FOUND,
        ERROR_STATUS.NOT_FOUND
      );
    }
    const aborted = await abortLaunchById(id);
    if (!aborted) {
      throw new CustomError(
        ERROR_MESSAGES.LAUNCH_NOT_ABORTED,
        ERROR_STATUS.BAD_REQUEST
      );
    }
    return res.status(ERROR_STATUS.OK).json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export { httpGetAllLaunches, httpCreateLaunch, httpAbortLaunch };
