const Airport = require('../model/airport');
const Flight = require('../model/flight');
const Weather = require('../model/weather');

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

const getNumberOfFlightsPerMonth = async (origin) => {
    let flightsPerMonth = [];

    for (var i = 0; i < 12; i++) {
        let countFilter = {
            "month": (i + 1)
        }

        if (origin != undefined) {
            countFilter.origin = origin;
        }

        let flights = await Flight.countDocuments(countFilter);
        flightsPerMonth[i] = flights;
    }

    return flightsPerMonth;
}

const countTopDestinations = async (number, origin) => {
    let aggregatePipeline = [{
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
    }];

    if (origin != undefined) {
        aggregatePipeline.unshift({
            $match: {
                origin: origin
            }
        });
    }

    let result = await Flight.aggregate(aggregatePipeline).exec();

    result.forEach((o) => {
        o.faa = o._id;
        delete o._id;
    });

    return result;
}

const meanAirtime = async (origin) => {
    let aggregatePipeline = [{
        $group: {
            _id: "$origin",
            average: {
                $avg: '$air_time'
            }
        }
    }];

    if (origin != undefined) {
        aggregatePipeline.unshift({
            $match: {
                origin: origin
            }
        });
    }

    let result = await Flight.aggregate(aggregatePipeline).exec();

    result.forEach((o) => {
        o.faa = o._id;
        delete o._id;
    });

    return result;
}

const weatherObservations = async (origin) => {
    let aggregatePipeline = [{
        $group: {
            _id: "$origin",
            count: {
                $sum: 1
            }
        }
    }];

    if (origin != undefined) {
        aggregatePipeline.unshift({
            $match: {
                origin: origin
            }
        });
    }

    let result = await Weather.aggregate(aggregatePipeline).exec();

    result.forEach((o) => {
        o.faa = o._id;
        delete o._id;
    });
    
    return result;
}

const dailyMeanTemperature = async (origin) => {
    let aggregatePipeline = [
        { $group: {
            _id: {
                "origin": "$origin" ,
                "month":"$month",
                "day": "$day"
            } ,
            average: {
                $avg: '$temp'
            }
        }},
        {
            $sort: {_id: 1, _id: 1 }
        }
    ];

    if (origin != undefined) {
        aggregatePipeline.unshift({
            $match: {
                origin: origin
            }
        });
    }

    let result = await Weather.aggregate(aggregatePipeline).exec();

    result.forEach((o) => {
        o.average = (o.average-32)/1.8;
        o.origin = o._id.origin
        o.month = o._id.month
        o.day = o._id.day
        delete o._id
    });

    return result;
}


module.exports = {
    getOrigins,
    getNumberOfFlightsPerMonth,
    countTopDestinations,
    meanAirtime,
    weatherObservations,
    dailyMeanTemperature
}