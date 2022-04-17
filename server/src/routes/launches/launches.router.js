const express = require('express');
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
} = require('./launches.controller');

const launchesRouter = express.Router();
// must put some string when we define endpoints even if they are already mounted on 'launches' (see note in app js)
launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;