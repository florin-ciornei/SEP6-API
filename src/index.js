const express = require('express')
const app = express()
const port = 8080
const csv = require('csvtojson')
const service = require("./service");
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb+srv://sepMongo:mongo@cluster0.besa8.mongodb.net/sep6?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MongoDB via Mongoose");
    });

app.use(cors())

app.use('/doc', express.static('doc'))


/**
 * @api {get} /origins General Route - Origins - Request origins information
 * @apiName GetOrigins
 * @apiGroup Route 0 
 * @apiSuccess {json[]} origins Returns an array of json objects containing all origins and their related information.
 */
app.get('/origins', async (req, res) => {
    let origins = await service.getOrigins();
    res.json(origins);
});


/**
 * @api {get} /noOfFlightsPerMonth?origin={origin} Flights per Month - Request Numeber of flights per month
 * @apiName GetNumeberOfFlights
 * @apiGroup Route 1 
 *
 * @apiParam {String} [origin] The number of lfights per month for that Origin.
 *
 * @apiSuccess {Numebr[]} number_Of_Flights Returns the numebr of flights.
 */
//without ?origin returns for all origins, with ?origin=... returns for that specific origin
app.get('/noOfFlightsPerMonth', async (req, res) => {
    let origin = req.query.origin;
    let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth(origin);
    res.json(noOfFlightsPerMonth);
});


/**
 * @api {get} /topDestinations?number={number}&origin={origin} Top Destinations - Request Top Destinations
 * @apiName GetTopDestinations
 * @apiGroup Route 2 
 *
 * @apiParam {Number} number The numer of destinatinos to be returned
 * @apiParam {String} [origin] Top Destinations for that origin number of lfights per month for that Origin.
 *
 * @apiSuccess {json[]} top_Destinations Returns an array of json objects 
 * containing the top destination airport codes and the number of flights 
 * made for each destination. These are the most frequently visited 
 * destinations in a descending order (i.e. Top Destinations).
 */
//without ?origin returns for all origins, with ?origin=... returns for that specific origin
app.get('/topDestinations', async (req, res) => {
    if (req.query.number == undefined)
        return res.status(400).send("Please specify the number " +
            "of top destinations to be returned");

    let number = parseInt(req.query.number);
    if (isNaN(number))
        return res.status(400).send("Number doesn't appear to be a number!");

    let origin = req.query.origin;

    let topDesinations = await service.countTopDestinations(number, origin);
    res.json(topDesinations);
});


/**
 * @api {get} /meanAirtime?origin={origin} Mean Air Time - Request Mean Air Time
 * @apiName GetMeanAirTime
 * @apiGroup Route 3
 *
 * @apiParam {String} [origin] The Mean Air Time for that Origin.
 *
 * @apiSuccess {json[]} mean_Air_Time Returns an array of json 
 * objects containing the average of the total time spent in 
 * air divided by the total number of flights for each origin.
 */
app.get('/meanAirtime', async (req, res) => {
    let origin = req.query.origin;
    let meanAirtimePerOrigin = await service.meanAirtime(origin);
    res.json(meanAirtimePerOrigin);
});


/**
 * @api {get} /weatherObservations?origin={origin} Weather Observations - Request Weather Observations
 * @apiName GetWeatherObservations
 * @apiGroup Route 4
 *
 * @apiParam {String} [origin] The total number of Weather Observations for that Origin.
 *
 * @apiSuccess {json[]} weather_Observations Returns an array of json 
 * objects containing the total number of weather observations per Origin.
 */
app.get('/weatherObservations', async (req, res) => {
    let origin = req.query.origin;
    let weatherObservationPerOrigin = await service.weatherObservations(origin);
    res.json(weatherObservationPerOrigin);
});

/**
 * @api {get} /dailyMeanTemperature?origin={origin} Daily Mean Temperature - Request Daily Mean Temperature
 * @apiName Get Daily Mean Temperature
 * @apiGroup Route 8 and 9
 *
 * @apiParam {String} [origin] The Daily Mean Temperature for that Origin.
 *
 * @apiSuccess {json[]} daily_Mean_Temperature Returns an array of json 
 * objects containing the average daily temperature for each day of the
 * month and for each month of the year for each origin.
 */
app.get('/dailyMeanTemperature', async (req, res) => {
    let origin = req.query.origin;
    let dailyMeanTemperaturePerOrigin = await service.dailyMeanTemperature(origin);
    res.json(dailyMeanTemperaturePerOrigin);
});


/**
 * @api {get} / Display Main Page
 * @apiName GetMainPage
 * @apiGroup Main Page
 *
 * @apiSuccess {Object} mainPage Returns the main page to be displayed for our RESTfull API.
 */
app.get('/', (req, res) => {
    res.send("Welcome to our SEP6 project !!! A RESTful API built by " +
        "Andrei, Daniela and Florin. ");
});

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`)
})