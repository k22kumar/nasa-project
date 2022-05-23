const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

// Old way of storing launches locally
// const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM, NASA'],
    upcoming: true,
    success: true,
};

// Old way to store launches locally in our Map
// launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
    // Check if the map has that key
    // old way local
    // return launches.has(launchId);
    // Check for a launch with flight number = that launch id
    return await launchesDatabase.findOne({
        flightNumber: launchId
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        // putting a '-' symbol infront lets MongoDB know to sort from highest to lowest
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    // Old way of getting launches
    // return Array.from(launches.values());
    return await launchesDatabase
        // return all objects but exclude the properties _id and __V
        .find({}, { '_id': 0, '__v': 0});
};

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('No matching planet was found');
    };
    // check if an existing launch is in DB with SAME flight number as the one from param
    // We are inserting the "launch" object from params
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM, NASA'],
        flightNumber: newFlightNumber
    });

    await saveLaunch(newLaunch);
}

saveLaunch(launch);

// Old way of doing it locally
// Object.assign allows us to add a new property to an existing object or overwrite old ones

// function addNewLaunch(launch) {
//     latestFlightNumber++;
//     launches.set(
//         latestFlightNumber,
//         Object.assign(launch, {
//         success: true,
//         upcoming: true,
//         customers: ['ZTM, NASA'],
//         flightNumber: latestFlightNumber
//     }));
// };

async function abortLaunchById(launchId) {
    // Old way locally
    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;

    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return aborted.modifiedCount === 1;
};

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    // addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById
};