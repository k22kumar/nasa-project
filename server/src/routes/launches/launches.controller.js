const {
    getAllLaunches,
    // addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch
} = require('../../model/launches.model');

async function httpGetAllLaunches(req, res) {
    // the .values() method will iterate over the Map and provide just the values to us
    // Need to convert the iterator that is returned by values method into some kind of object that we can return as json. Use Array.from to convert the iterator into an array of values
    return res.status(200).json(await getAllLaunches());
};

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    };

    // sample ways to check for invalid date
    launch.launchDate = new Date(launch.launchDate);
    // if (launch.launchDate.toString() === 'Invalid Date') {
    //     reject  here
    // }
    // isNaN builtin function checks if its a number
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    };
    // Old way local
    // addNewLaunch(launch);
    // New way MongoDB
    await scheduleNewLaunch(launch);
    // good practice to return the new object for post
    return res.status(201).json(launch);
};

async function httpAbortLaunch(req, res) {
    // This returns a string make sure to convert to Number
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    } else {
        const aborted = await abortLaunchById(launchId);

        if (!aborted) {
            return res.status(400).json({
                error: 'Launch not aborted'
            })
        }
        // old way
        // return res.status(200).json(aborted);
        return res.status(200).json({
            ok: true
        });
    }
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};