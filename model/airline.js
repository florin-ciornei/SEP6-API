var mongoose = require('mongoose');

var AirlineSchema = new mongoose.Schema({
    "carrier": {
        "type": "String"
    },
    "name": {
        "type": "String"
    }
});

var Airline = mongoose.model('Airline', AirlineSchema);
module.exports = Airline;