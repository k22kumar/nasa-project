const { getAllPlanets } = require('../../model/planets.model')

async function httpGetAllPlanets(req, res) {
    // return ensures only one response is ever set its a good pattern to follow
    return res.status(200).json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};