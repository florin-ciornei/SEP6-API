var mongoose = require('mongoose');

var AirportSchema = new mongoose.Schema({
    "faa": {
        "type": "String"
    },
    "name": {
        "type": "String"
    },
    "lat": {
        "type": "Number"
    },
    "lon": {
        "type": "Number"
    },
    "alt": {
        "type": "Number"
    },
    "tz": {
        "type": "Number"
    },
    "dst": {
        "type": "String"
    },
    "tzone": {
        "type": "String"
    }
});

var Airport = mongoose.model('Airport', AirportSchema);
module.exports = Airport;