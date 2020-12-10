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

describe("Test /weatherObservation", function () {
    test('There are 3 returned values', async () => {
        let weatherObservations = await service.weatherObservation();
        expect(weatherObservations.length).toBe(3);
    });

    test('There is only one JFK', async () => {
        let weatherObservations = await service.weatherObservation();
        expect(weatherObservations.filter((o) => o.faa === "JFK").length).toBe(1);
    });

    test('There is only one EWR', async () => {
        let weatherObservations = await service.weatherObservation();
        expect(weatherObservations.filter((o) => o.faa === "EWR").length).toBe(1);
    });

    test('There is only one LGA', async () => {
        let weatherObservations = await service.weatherObservation();
        expect(weatherObservations.filter((o) => o.faa === "LGA").length).toBe(1);
    });

    test('When "JFK" is passed as argument, a single value is returned', async () => {
        let weatherObservations = await service.weatherObservation("JFK");
        expect(weatherObservations.length).toBe(1);
    });

    test('When "JFK" is passed as argument, the returned value has faa JFK', async () => {
        let weatherObservations = await service.weatherObservation("JFK");
        expect(weatherObservations[0].faa).toBe("JFK");
    });
});


afterAll(async () => {
    return await mongoose.disconnect();
});