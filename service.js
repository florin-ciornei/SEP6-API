const csv = require('csvtojson')
const Airport = require('./model/airport');
const Flight = require('./model/flight');

const getOrigins = async () => {
    let origins = await Airport.find({ $or: [{ "faa": "JFK" }, { "faa": "LGA" }, { "faa": "EWR" }] }).exec();
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

const getNumberOfFlightsPerMonthPerOrigin = async () => {
    let flightsAtJFK = await Flight.find().where({ "origin": "JFK" }).exec();
    let flightsAtLGA = await Flight.find().where({ "origin": "LGA" }).exec();
    let flightsAtEWR = await Flight.find().where({ "origin": "EWR" }).exec();
    let totalFlightsCount = [];
    // let flights = await csv().fromFile("./initialDataLoading/files/flights.csv");
    let noOfFlightsPerYearMonthAtJFK = {};
    let noOfFlightsPerYearMonthAtLGA = {};
    let noOfFlightsPerYearMonthAtEWR = {};

    flightsAtJFK.forEach((flight) => {
        if (noOfFlightsPerYearMonthAtJFK[flight.month] == undefined)
            noOfFlightsPerYearMonthAtJFK[flight.month] = 1;
        else
            noOfFlightsPerYearMonthAtJFK[flight.month]++;
    });

    flightsAtLGA.forEach((flight) => {
        if (noOfFlightsPerYearMonthAtLGA[flight.month] == undefined)
            noOfFlightsPerYearMonthAtLGA[flight.month] = 1;
        else
            noOfFlightsPerYearMonthAtLGA[flight.month]++;
    });

    flightsAtEWR.forEach((flight) => {
        if (noOfFlightsPerYearMonthAtEWR[flight.month] == undefined)
            noOfFlightsPerYearMonthAtEWR[flight.month] = 1;
        else
            noOfFlightsPerYearMonthAtEWR[flight.month]++;
    });

    totalFlightsCount = [noOfFlightsPerYearMonthAtJFK,
        noOfFlightsPerYearMonthAtLGA,
        noOfFlightsPerYearMonthAtEWR];
    return totalFlightsCount;
}

module.exports = {
    getOrigins,
    getNumberOfFlightsPerMonth,
    getNumberOfFlightsPerMonthPerOrigin
}