import express, { Router } from 'express';
import { httpGetAllPlanets } from './planets.controller';

const routeInit = (): Router => {
  const planetsRouter = express.Router();

  planetsRouter.get('/', httpGetAllPlanets);

  return planetsRouter;
};

export default routeInit;
