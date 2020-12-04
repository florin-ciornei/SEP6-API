var mongoose = require('mongoose');

var WeatherSchema = new mongoose.Schema({
    "origin": {
        "type": "String"
    },
    "year": {
        "type": "Number"
    },
    "month": {
        "type": "Number"
    },
    "day": {
        "type": "Number"
    },
    "hour": {
        "type": "Number"
    },
    "temp": {
        "type": "Number"
    },
    "dewp": {
        "type": "Number"
    },
    "humid": {
        "type": "Number"
    },
    "wind_dir": {
        "type": "Number"
    },
    "wind_speed": {
        "type": "Number"
    },
    "wind_gust": {
        "type": "Number"
    },
    "precip": {
        "type": "Number"
    },
    "pressure": {
        "type": "Number"
    },
    "visib": {
        "type": "Number"
    },
    "time_hour": {
        "type": "Date"
    }
});

var Weather = mongoose.model('Weather', WeatherSchema);
module.exports = Weather;