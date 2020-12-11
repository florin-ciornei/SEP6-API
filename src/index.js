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
 * @apiGroup Route 00 
 * @apiSuccess {json[]} origins Returns an array of json objects containing all 
 * origins and their related information.
 */
app.get('/origins', async (req, res) => {
    let origins = await service.getOrigins();
    res.json(origins);
});


/**
 * @api {get} /noOfFlightsPerMonth?origin={origin}
 * Flights per Month - Request Numeber of flights per month
 * @apiName GetNumeberOfFlights
 * @apiGroup Route 01 
 *
 * @apiParam {String} [origin] The number of lfights per month for that Origin.
 *
 * @apiSuccess {Numebr[]} number_Of_Flights Returns the numebr of flights.
 */
//without ?origin returns for all origins, with ?origin=... returns for that 
//specific origin
app.get('/noOfFlightsPerMonth', async (req, res) => {
    let origin = req.query.origin;
    let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth(origin);
    res.json(noOfFlightsPerMonth);
});


/**
 * @api {get} /topDestinations?number={number}&origin={origin} 
 * Top Destinations - Request Top Destinations
 * @apiName GetTopDestinations
 * @apiGroup Route 02 
 *
 * @apiParam {Number} number The numer of destinatinos to be returned
 * @apiParam {String} [origin] Top Destinations for that origin number 
 * of lfights per month for that Origin.
 *
 * @apiSuccess {json[]} top_Destinations Returns an array of json objects 
 * containing the top destination airport codes and the number of flights 
 * made for each destination. These are the most frequently visited 
 * destinations in a descending order (i.e. Top Destinations).
 */
//without ?origin returns for all origins, with ?origin=... returns 
//for that specific origin
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
 * @api {get} /meanAirtime?origin={origin} 
 * Mean Air Time - Request Mean Air Time
 * @apiName GetMeanAirTime
 * @apiGroup Route 03
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
 * @api {get} /weatherObservations?origin={origin} 
 * Weather Observations - Request Weather Observations
 * @apiName GetWeatherObservations
 * @apiGroup Weather
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
 * @api {get} /temperature?origin={origin} 
 * All Measured Temperatures at Origin - Request All Measured Temperatures at Origin
 * @apiName Get Daily Mean Temperature
 * @apiGroup Weather
 *
 * @apiParam {String} [origin] The Daily Mean Temperature for that Origin.
 *
 * @apiSuccess {json[]} temperature Returns an array of json objects 
 * containing ALL the temperature measurements registered at that origin.
 */
app.get('/temperature', async (req, res) => {
    let origin = req.query.origin;
    let temperaturePerOrigin = await service.temperature(origin);
    res.json(temperaturePerOrigin);
});

/**
 * @api {get} /dailyMeanTemperature?origin={origin} 
 * Daily Mean Temperature - Request Daily Mean Temperature
 * @apiName Get Daily Mean Temperature
 * @apiGroup Weather
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
 * @api {get} /meanDepartureArrivalDelay?origin={origin} 
 * Mean Departure Arrival Delay - Request Mean Departure Arrival Delay
 * @apiName Get Mean Departure Arrival Delay
 * @apiGroup Route 10
 *
 * @apiParam {String} [origin] The Mean Departure Arrival Delay for that Origin.
 *
 * @apiSuccess {json[]} mean_Dep_Arr_Delay Returns an array of json 
 * objects containing the average Departure and Arrival Delay for 
 * each of the three origins
 */
app.get('/meanDepartureArrivalDelay', async (req, res) => {
    let origin = req.query.origin;
    let meanDepartureArrivalDelayPerOrigin = await service.meanDepartureArrivalDelay(origin);
    res.json(meanDepartureArrivalDelayPerOrigin);
});

/**
 * @api {get} /manufacturersWithMinPlanes
 * Manufacturers with minimum planes
 * @apiGroup Manufacturers
 * @apiParam {Number} minPlanes Minimum number of planes
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *              "number_of_planes":1630,
 *              "manufacturer":"BOEING"
 *         }
 *     ]
 */
app.get('/manufacturersWithMinPlanes', async (req, res) => {
    let minPlanes = req.query.minPlanes;
    let manufacturersWithMinPlanesPerOrigin = await service.manufacturersWithMinPlanes(minPlanes);
    res.json(manufacturersWithMinPlanesPerOrigin);
});

/**
 * @api {get} /numberOfPlanesOfEachModel
 * Number of planes of each model
 * @apiGroup Manufacturers
 * @apiParam {String} manufacturer The manufacturer whose planes will be counted.
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *              "count":127,
 *              "model":"A320-232"
 *         }
 *     ]
 */
app.get('/numberOfPlanesOfEachModel', async (req, res) => {
    let manufacturer = req.query.manufacturer;

    if (manufacturer == undefined)
        return res.status(400).send("Please add manufacturer query parameter, ex: ?manufacturer=AIRBUS%20INDUSTRIE")

    let data = await service.numberOfPlanesOfEachModel(manufacturer);
    res.json(data);
});

/**
 * @api {get} /noOfFlightsPerManufacter
 * Number of flights per manufacturer
 * @apiGroup Manufacturers
 * @apiParam {Number} minPlanes Number of minimum planes a manufacturer must have to be included in the counting.
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *              "manufacturer": "AIRBUS",
 *              "count": 125
 *         }
 *     ]
 */
app.get('/noOfFlightsPerManufacter', async (req, res) => {
    if (req.query.minPlanes == undefined)
        return res.status(400).send("Please specify the number " +
            "of the min planes a manufacturer should have");

    let minPlanes = parseInt(req.query.minPlanes);
    if (isNaN(minPlanes))
        return res.status(400).send("minPlanes doesn't appear to be a number!");

    let data = await service.numberOfFlightsPerManufacturerWithMinPlanes(minPlanes);
    res.json(data);
});

/**
 * @api {get} / Display Main Page
 * @apiName GetMainPage
 * @apiGroup Welcome
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