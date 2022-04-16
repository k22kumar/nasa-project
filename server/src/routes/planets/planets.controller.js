const { planets } = require('../../model/planets.model')

function getAllPlanets(req, res) {
    // return ensures only one response is ever set its a good pattern to follow
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets
};