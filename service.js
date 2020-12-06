const Airport = require('./model/airport');
const Flight = require('./model/flight');
const Weather = require('./model/weather');

const getOrigins = async () => {
    let origins = await Airport.find({
        $or: [{
            "faa": "JFK"
        }, {
            "faa": "LGA"
        }, {
            "faa": "EWR"
        }]
    }).exec();
    return origins;
}

const getNumberOfFlightsPerMonth = async () => {
    let flightsPerMonth = [];

    for (var i = 0; i < 12; i++) {
        let flights = await Flight.countDocuments({
            "month": (i + 1)
        });
        flightsPerMonth[i] = flights;
    }

    return flightsPerMonth;
}

const getNumberOfFlightsPerMonthPerOrigin = async (origin) => {
    let flightsPerMonth = [];

    for (var i = 0; i < 12; i++) {
        let flights = await Flight.countDocuments({
            "month": (i + 1),
            "origin": origin
        });
        flightsPerMonth[i] = flights;
    }

    return flightsPerMonth;
}

const countTopDestinations = async (number) => {
    let result = await Flight.aggregate([{
        $group: {
            _id: "$dest",
            count: {
                $sum: 1
            }
        }
    }, {
        $sort: {
            count: -1
        }
    }, {
        $limit: number
    }]).exec();

    return result;
}

const countTopDestinationsPerOrigin = async (number, origin) => {
    let result = await Flight.aggregate([{
        $match: {
            origin: origin
        }
    },
    {
        $group: {
            _id: "$dest",
            count: {
                $sum: 1
            }
        }
    }, {
        $sort: {
            count: -1
        }
    }, {
        $limit: number
    }
    ]).exec();

    return result;
}

const meanAirtimePerOrigin = async () => {
    let result = await Flight.aggregate([{
        $group: {
            _id: "$origin",
            average: {
                $avg: '$air_time'
            }
        }
    }
    ]).exec();

    return result;
}

const weatherObservationPerOrigin = async () => {
    let result = await Weather.aggregate([{
        $group: {
            _id: "$origin",
            count: {
                $sum: 1
            }
        }
    }
    ]).exec();

    return result;
}


module.exports = {
    getOrigins,
    getNumberOfFlightsPerMonth,
    getNumberOfFlightsPerMonthPerOrigin,
    countTopDestinations,
    countTopDestinationsPerOrigin,
    meanAirtimePerOrigin,
    weatherObservationPerOrigin
}