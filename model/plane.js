var mongoose = require('mongoose');

var PlaneSchema = new mongoose.Schema({
    "tailnum": {
        "type": "String"
    },
    "year": {
        "type": "Number"
    },
    "type": {
        "type": "String"
    },
    "manufacturer": {
        "type": "String"
    },
    "model": {
        "type": "String"
    },
    "engines": {
        "type": "Number"
    },
    "seats": {
        "type": "Number"
    },
    "speed": {
        "type": "String"
    },
    "engine": {
        "type": "String"
    }
});

var Plane = mongoose.model('Plane', PlaneSchema);
module.exports = Plane;