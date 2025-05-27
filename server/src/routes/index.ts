import * as express from 'express';
import planetsRouter from './planets/planets.router';
import launchesRouter from './launches/launches.router';

const routeInit = (): express.Router => {
  const router = express.Router();

  router.use('/planets', planetsRouter());
  router.use('/launches', launchesRouter());

  return router;
};

export default routeInit;
