const express = require('express');
const { httpGetAllPlanets } = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/api/planets', httpGetAllPlanets);

module.exports = planetsRouter;
