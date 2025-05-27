import express, { Router } from 'express';

import {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpDeleteLaunch,
} from './launches.controller';

const routeInit = (): Router => {
  const launchesRouter = express.Router();

  launchesRouter.get('/', httpGetAllLaunches);
  launchesRouter.post('/', httpCreateLaunch);
  launchesRouter.delete('/:id', httpDeleteLaunch);

  return launchesRouter;
};

export default routeInit;
