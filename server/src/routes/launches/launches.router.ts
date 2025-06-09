import express, { Router } from 'express';

import {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch,
} from './launches.controller';

const routeInit = (): Router => {
  const launchesRouter = express.Router();

  launchesRouter.get('/', httpGetAllLaunches);
  launchesRouter.post('/', httpCreateLaunch);
  launchesRouter.delete('/:id', httpAbortLaunch);

  return launchesRouter;
};

export default routeInit;
