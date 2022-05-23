const planets = require('./planets.mongo');

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function isHabitablePlanet(planet) {
    // koi disposition is if its been observed by kepler, koi_insol is amount of stellar flux, koi_prad
    return planet['koi_disposition'] === 'CONFIRMED'
        // amount of starlight they get 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        // cant be more than 1.6 earths radius
        && planet['koi_prad'] < 1.6
}


function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        // streams are asyncronous
        fs.createReadStream( path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            // treat lines that start with this character as comments
            comment: '#',
            // return each row as a JS object with key value pairs
            columns: true
        }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    // upsert
                    // first arg, if it does not exist insert this object, second arg if it exists update with this obj, by default, update only updates third arg will make sure it upserts
                    savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            });
    });
}

async function getAllPlanets() {
    //find first arg: filter objects based on some criteria
    // second arg: only out put specific fields
    return await planets.find({});
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
        keplerName: planet.kepler_name
    }, {
        keplerName: planet.kepler_name
    }, {
        upsert: true
    });
    } catch (error) {
        console.error(`Could not save planet ${err}`);
    }
}

// REMEMBER Node wont wait for any streams to complete before exporting
module.exports = {
    loadPlanetsData,
    getAllPlanets,
    savePlanet
};