const csv = require('csvtojson')
const Airport = require('./model/airport');

const getOrigins = async () => {
    let origins = await Airport.find({$or:[{ "faa": "JFK"}, {"faa": "LGA"}, {"faa": "EWR"}]}).exec();
    return origins;
    //[ , { faa: 'LGA' }, { faa: 'EWR' }]
    // let origins = await csv().fromFile("./initialDataLoading/files/airports.csv");
    // return origins;/
}

const getNumberOfFlightsPerMonth = async () => {
    let flights = await csv().fromFile("./initialDataLoading/files/flights.csv");

    let noOfFlightsPerYearMonth = {};

    flights.forEach((flight) => {
        if (noOfFlightsPerYearMonth[flight.month] == undefined)
            noOfFlightsPerYearMonth[flight.month] = 1;
        else
            noOfFlightsPerYearMonth[flight.month]++;
    });

    return noOfFlightsPerYearMonth;
}

module.exports = {
    getOrigins,
    getNumberOfFlightsPerMonth
}