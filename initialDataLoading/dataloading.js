const mongoose = require('mongoose');
const Airline = require('../model/airline');
const Airport = require('../model/airport');
const Flight = require('../model/flight');
const Plane = require('../model/plane');
const Weather = require('../model/weather');

const csv = require('csvtojson');
const {
    count
} = require('../model/airport');

mongoose.connect('mongodb+srv://sepMongo:mongo@cluster0.besa8.mongodb.net/sep6?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to MongoDB via Mongoose");

    // console.log("-----LOADING AIRLINES------");
    // await Airline.deleteMany({});
    // console.log("Cleared airlines");

    // let airlines = await csv().fromFile("./initialDataLoading/files/airlines.csv");
    // console.log("Airlines loaded to JSON");

    // await Airline.create(airlines);
    // console.log("Airlines saved to MongoDB");




    // console.log("\n\n\n-----LOADING AIRPORTS------");
    // await Airport.deleteMany({});
    // console.log("Cleared airports");

    // let airports = await csv().fromFile("./initialDataLoading/files/airports.csv");
    // console.log("Airports loaded to JSON");

    // await Airport.create(airports);
    // console.log("Airports saved to MongoDB");



    console.log("\n\n\n-----LOADING FLIGHTS------");
    await Flight.deleteMany({});
    console.log("Cleared flights");

    let flights = await csv().fromFile("./initialDataLoading/files/flights.csv");
    console.log("Flights loaded to JSON");

    for (var i = 0; i < flights.length; i++) {
        (new Flight(flights[i]).save()
            .then(
            )
            .catch(err => {
                // console.log(flights[i]);
            }));
        if (i % 10000 === 0) {
            // console.log(flights[i]);
            console.log(`${i} airlines loaded`);
        }
        if (i > 160700) {
            // console.log(flights[i]);
            console.log(`${i} airlines loaded`);
        }

    }

    console.log("Flights saved to MongoDB");



    // console.log("\n\n\n-----LOADING PLANES------");
    // await Plane.deleteMany({});
    // console.log("Cleared planes");

    // let planes = await csv().fromFile("./initialDataLoading/files/planes.csv");
    // console.log("Planes loaded to JSON");

    // await Plane.create(planes);

    // console.log("Planes saved to MongoDB");




    // console.log("\n\n\n-----LOADING WEATHER------");
    // await Weather.deleteMany({});
    // console.log("Cleared weather");

    // let weather = await csv().fromFile("./initialDataLoading/files/weather.csv");
    // console.log("Weather loaded to JSON");

    // await Weather.create(weather);

    // console.log("Weather saved to MongoDB");


});