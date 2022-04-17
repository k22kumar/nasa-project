const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

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
            .on('data', (data) => {
                if (isHabitablePlanet(data)) habitablePlanets.push(data);
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

// REMEMBER Node wont wait for any streams to complete before exporting
module.exports = {
    loadPlanetsData,
    getAllPlanets
};