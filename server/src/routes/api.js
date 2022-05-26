const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router();

api.use(planetsRouter);
// first optional arguement allows you to mount a router on a particular path for example '/launches' now all routes in launchesRouter start with '/launches'
api.use('/launches', launchesRouter);
// Usually client is responsible for routing between views but if the pages are being loaded by the server then the server will attempt to find matching view routes that do not exist (in the server side public folder / build files), use the * to match any endpoint that is not matched from the above lines of code ie: planetsRouter, launchesRouter etc. It will pass it on to the client in our index.html so whatever the frontend is (our case react) can handle the front end. Server just sends the html
// For more info you can look at the docs in Node for client router specifications

module.exports = api;