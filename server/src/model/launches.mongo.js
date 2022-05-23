const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    // example of property validation configuration
    flightNumber: {
        type: Number,
        required: true,
        // default: 100,
        // min: 100,
        // max: 999
    },
    launchDate: {
        type: Date,
        required: true
    },
    rocket: {
        type: String,
        require: true
    },
    mission: {
        type: String,
        require: true
    },
    target: {
        type: String,
        require: true
    },
    customers: [ String ],
    upcoming: {
        type: Boolean,
        require: true
    },
    success: {
        type: Boolean,
        require: true,
        default: true
    },
});
// Connects launchesSchema with the "launches" Collections, internally Mongoose
// will make this plural
module.exports = mongoose.model('Launch', launchesSchema);