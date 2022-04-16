const express = require('express');
// const planetsController = require('./planets.controller');
// OR you can desctructure
const {
    getAllPlanets
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;