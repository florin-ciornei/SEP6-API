const csv = require('csvtojson')
const Airport = require('./model/airport');
const Flight = require('./model/flight');

const getOrigins = async () => {
    let origins = await Airport.find({$or:[{ "faa": "JFK"}, {"faa": "LGA"}, {"faa": "EWR"}]}).exec();
    return origins;
}

const getNumberOfFlightsPerMonth = async () => {
    let flights = await Flight.find().exec();
    // let flights = await csv().fromFile("./initialDataLoading/files/flights.csv");
    let noOfFlightsPerYearMonth = {};

    flights.forEach((flight) => {
        if (noOfFlightsPerYearMonth[flight.month] == undefined)
            noOfFlightsPerYearMonth[flight.month] = 1;
        else
            noOfFlightsPerYearMonth[flight.month]++;
    });

    return noOfFlightsPerYearMonth;
}

const getNumberOfFlightsPerMonthPerOrigin = async () => {
    let flightsAtJFK = await Flight.find().where({"origin": "JFK"}).exec();
    let flightsAtLGA = await Flight.find().where({"origin": "LGA"}).exec();
    let flightsAtEWR = await Flight.find().where({"origin": "EWR"}).exec();
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

    return noOfFlightsPerYearMonthAtJFK;
}

module.exports = {
    getOrigins,
    getNumberOfFlightsPerMonth,
    getNumberOfFlightsPerMonthPerOrigin
}