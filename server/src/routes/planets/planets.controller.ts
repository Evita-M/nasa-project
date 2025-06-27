import { getAllPlanets } from '../../models/planets.model';
import { Request, Response } from 'express';
import CustomError from '../../utils/CustomError';
import { ERROR_MESSAGES, ERROR_STATUS } from '../../utils/error.constants';

async function httpGetAllPlanets(
  req: Request,
  res: Response,
  next: any
): Promise<any> {
  try {
    const planets = await getAllPlanets();
    return res.status(ERROR_STATUS.OK).json(planets);
  } catch (error) {
    next(
      new CustomError(
        ERROR_MESSAGES.FAILED_TO_FETCH_PLANETS,
        ERROR_STATUS.INTERNAL_SERVER_ERROR
      )
    );
  }
}

export { httpGetAllPlanets };
