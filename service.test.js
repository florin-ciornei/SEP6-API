/**
 * These tests are written to illustrate the usage of tests in CI/CD. They don't test everything thoroughly.
 * The tests rely on the initial data provided in the .csv files. If in doubt, run ./initialDataLoading/dataloading.js
 * to completly clean the database and populate it with the initial data.
 */

const service = require("./src/service");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sepMongo:mongo@cluster0.besa8.mongodb.net/sep6?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MongoDB via Mongoose");
    });

    // Tests for Route 0
describe("Test /origins", function () {
    test('Origins returns 3 origins', async () => {
        let origins = await service.getOrigins();
        expect(origins.length).toBe(3);
    });

    test('Origins has a single JFK', async () => {
        let origins = await service.getOrigins();
        expect(origins.filter((origin) => origin.faa === "JFK").length).toBe(1);
    });

    test('Origins has a single EWR', async () => {
        let origins = await service.getOrigins();
        expect(origins.filter((origin) => origin.faa === "EWR").length).toBe(1);
    });

    test('Origins has a single LGA', async () => {
        let origins = await service.getOrigins();
        expect(origins.filter((origin) => origin.faa === "LGA").length).toBe(1);
    });
});

// Tests for Route 1
describe("Test /noOfFlightsPerMonth", function () {
    test("There are exactly 12 numbers in the returned array, one for each month, WITHOUT origin", async () => {
        let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth();
        expect(noOfFlightsPerMonth.length).toBe(12);
    });

    test("There are exactly 12 numbers in the returned array, one for each month, WITH origin", async () => {
        let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth("JFK");
        expect(noOfFlightsPerMonth.length).toBe(12);
    });
});

// Tests for Route 2
describe("Test /topDestinations", function () {
    test("Top destinations returns 10 destinations", async () => {
        let destinations = await service.countTopDestinations(10);
        expect(destinations.length).toBe(10);
    });

    test("Top destinations returns 1 destination", async () => {
        let destinations = await service.countTopDestinations(1);
        expect(destinations.length).toBe(1);
    });

    test("Top destinations returns 15 destination", async () => {
        let destinations = await service.countTopDestinations(1);
        expect(destinations.length).toBe(1);
    });

    test("Naive test for descending order", async () => {
        let destinations = await service.countTopDestinations(1);
        expect(destinations[0].count).toBeGreaterThanOrEqual(destinations[destinations.length - 1].count);
    });
});

// Tests for Route 3
describe("Test /meanAirtime", function () {
    test('There are 3 returned values', async () => {
        let meanAirtime = await service.meanAirtime();
        expect(meanAirtime.length).toBe(3);
    });

    test('There is only one JFK', async () => {
        let meanAirtime = await service.meanAirtime();
        expect(meanAirtime.filter((o) => o.faa === "JFK").length).toBe(1);
    });

    test('There is only one EWR', async () => {
        let meanAirtime = await service.meanAirtime();
        expect(meanAirtime.filter((o) => o.faa === "EWR").length).toBe(1);
    });

    test('There is only one LGA', async () => {
        let meanAirtime = await service.meanAirtime();
        expect(meanAirtime.filter((o) => o.faa === "LGA").length).toBe(1);
    });

    test('When "JFK" is passed as argument, a single value is returned', async () => {
        let meanAirtime = await service.meanAirtime("JFK");
        expect(meanAirtime.length).toBe(1);
    });

    test('When "JFK" is passed as argument, the returned value has faa JFK', async () => {
        let meanAirtime = await service.meanAirtime("JFK");
        expect(meanAirtime[0].faa).toBe("JFK");
    });
});

// Tests for Route 4
describe("Test /weatherObservations", function () {
    test('There are 3 returned values', async () => {
        let weatherObservations = await service.weatherObservations();
        expect(weatherObservations.length).toBe(3);
    });

    test('There is only one JFK', async () => {
        let weatherObservations = await service.weatherObservations();
        expect(weatherObservations.filter((o) => o.faa === "JFK").length).toBe(1);
    });

    test('There is only one EWR', async () => {
        let weatherObservations = await service.weatherObservations();
        expect(weatherObservations.filter((o) => o.faa === "EWR").length).toBe(1);
    });

    test('There is only one LGA', async () => {
        let weatherObservations = await service.weatherObservations();
        expect(weatherObservations.filter((o) => o.faa === "LGA").length).toBe(1);
    });

    test('When "JFK" is passed as argument, a single value is returned', async () => {
        let weatherObservations = await service.weatherObservations("JFK");
        expect(weatherObservations.length).toBe(1);
    });

    test('When "JFK" is passed as argument, the returned value has faa JFK', async () => {
        let weatherObservations = await service.weatherObservations("JFK");
        expect(weatherObservations[0].faa).toBe("JFK");
    });
});

// Tests for Route 7
describe("Test /temperature", function () {
    test('There is no returned value for passing no argument/parameter', async () => {
        let temperature = await service.temperature();
        expect(temperature.length).toBe(0);
    });

    test('There are 8711 temperature observations at JFK', async () => {
        let temperature = await service.temperature("JFK");
        expect(temperature.length).toBe(8711);
    });

    test('There are 8711 temperature observations at LGA', async () => {
        let temperature = await service.temperature("LGA");
        expect(temperature.length).toBe(8711);
    });
    
    test('There are 8708 temperature observations at EWR', async () => {
        let temperature = await service.temperature("EWR");
        expect(temperature.length).toBe(8708);
    });
});


// Tests for Route 8 AND 9
describe("Test /dailyMeanTemperature", function () {
    test('There are 93 values returned for passing no argument/parameter', async () => {
        let dailyMeanTemperature = await service.dailyMeanTemperature();
        expect(dailyMeanTemperature.length).toBe(93);
    });

    test('There are 8711 dailyMeanTemperature observations at JFK', async () => {
        let dailyMeanTemperature = await service.dailyMeanTemperature("JFK");
        expect(dailyMeanTemperature.length).toBe(8711);
    });

    test('There are 8711 dailyMeanTemperature observations at LGA', async () => {
        let dailyMeanTemperature = await service.dailyMeanTemperature("LGA");
        expect(dailyMeanTemperature.length).toBe(8711);
    });
    
    test('There are 8708 dailyMeanTemperature observations at EWR', async () => {
        let dailyMeanTemperature = await service.dailyMeanTemperature("EWR");
        expect(dailyMeanTemperature.length).toBe(8708);
    });
});

// Tests for Route 10

// Tests for Route 11


afterAll(async () => {
    return await mongoose.disconnect();
});