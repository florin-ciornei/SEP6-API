var mongoose = require('mongoose');

var FlightSchema = new mongoose.Schema({
    "year": {
        "type": "Number"
    },
    "month": {
        "type": "Number"
    },
    "day": {
        "type": "Number"
    },
    "dep_time": {
        "type": "Number"
    },
    "dep_delay": {
        "type": "Number"
    },
    "arr_time": {
        "type": "Number"
    },
    "arr_delay": {
        "type": "Number"
    },
    "carrier": {
        "type": "String"
    },
    "tailnum": {
        "type": "String"
    },
    "flight": {
        "type": "Number"
    },
    "origin": {
        "type": "String"
    },
    "dest": {
        "type": "String"
    },
    "air_time": {
        "type": "Number"
    },
    "distance": {
        "type": "Number"
    },
    "hour": {
        "type": "Number"
    },
    "minute": {
        "type": "Number"
    }
});

var Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;