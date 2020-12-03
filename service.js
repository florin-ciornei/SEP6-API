const csv = require('csvtojson')

const getOrigins = async () => {
    let origins = await csv().fromFile("./files/airports.csv");
    return origins;
}

const getNumberOfFlightsPerMonth = async () => {
    let flights = await csv().fromFile("./files/flights.csv");

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