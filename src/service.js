const Airport = require('../model/airport');
const Flight = require('../model/flight');
const Weather = require('../model/weather');
const Plane = require('../model/plane');

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

    let topDestinationsGlobal;
    if (origin != undefined) {
        topDestinationsGlobal = await countTopDestinations(number);
        let filter = {
            $match: {
                dest: {
                    $in: topDestinationsGlobal.map(o => o.faa)
                },
                origin: origin
            }
        };
        aggregatePipeline.unshift(filter);
    }

    let result = await Flight.aggregate(aggregatePipeline).exec();

    result.forEach((o) => {
        o.faa = o._id;
        delete o._id;
    });

    //if an origin doesn't have any flights to a destination, insert it with count:0, so it doesn't return an array with less elements
    if (origin != undefined && result.length < topDestinationsGlobal.length) {
        topDestinationsGlobal.forEach(d => {
            if (result.filter(e => e.faa == d.faa).length == 0)
                result.push({
                    faa: d.faa,
                    count: 0
                });
        });
    }

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

const temperature = async (origin) => {
    let result = await Weather.find({'origin': origin}).select('temp').exec();

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

const numberOfPlanesOfEachModel = async (manufacturer) => {
    let aggregatePipeline = [{
        $match: {
            manufacturer: manufacturer
        }
    }, {
        $group: {
            _id: "$model",
            count: {
                $sum: 1
            }
        }
    }];

    let result = await Plane.aggregate(aggregatePipeline).exec();

    result.forEach(o=>{
        o.model=o._id;
        delete o._id;
    });

    return result;
}


module.exports = {
    getOrigins,
    getNumberOfFlightsPerMonth,
    countTopDestinations,
    meanAirtime,
    weatherObservations,
    dailyMeanTemperature,
    numberOfPlanesOfEachModel,
    temperature
}