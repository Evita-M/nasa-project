const express = require('express');
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/api/launches', httpGetAllLaunches);
launchesRouter.post('/api/launches', httpAddNewLaunch);
launchesRouter.delete('/api/launches/:id', httpAbortLaunch);

module.exports = launchesRouter;
