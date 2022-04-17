const { getAllLaunches } = require('../../model/launches.model');

function httpGetAllLaunches(req, res) {
    // the .values() method will iterate over the Map and provide just the values to us
    // Need to convert the iterator that is returned by values method into some kind of object that we can return as json. Use Array.from to convert the iterator into an array of values
    return res.status(200).json(getAllLaunches());
};

module.exports = {
    httpGetAllLaunches
};