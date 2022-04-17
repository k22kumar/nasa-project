const { getAllPlanets } = require('../../model/planets.model')

function httpGetAllPlanets(req, res) {
    // return ensures only one response is ever set its a good pattern to follow
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};