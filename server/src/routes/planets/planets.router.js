const express = require('express');
// const planetsController = require('./planets.controller');
// OR you can desctructure
const {
    httpGetAllPlanets
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetAllPlanets);

module.exports = planetsRouter;