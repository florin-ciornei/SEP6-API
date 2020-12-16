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
 * @api {get} /origins
 * Get all origins
 * @apiGroup Origins
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *              "_id":"5fccb4affe083721fcd39450",
 *              "faa":"EWR",
 *              "name":"Newark Liberty Intl",
 *              "lat":40.6925,
 *              "lon":-74.168667,
 *              "alt":18,
 *              "tz":-5,
 *              "dst":"A",
 *              "tzone":"America/New_York",
 *              "__v":0
 *          },
 *          ...
 *     ]
 */
app.get('/origins', async (req, res) => {
    let origins = await service.getOrigins();
    res.json(origins);
});


/**
 * @api {get} /noOfFlightsPerMonth
 * Flights per month
 * @apiGroup Flights
 *
 * @apiParam {String} [origin] The number of flights per month for that origin. If not specified, returns for all origins.
 *
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [3371,3074,3589,3443,3540,3578,3738,3755,3465,3628,3356,3476] //exactly 12 numbers, one for each month
 */
app.get('/noOfFlightsPerMonth', async (req, res) => {
    let origin = req.query.origin;
    let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth(origin);
    res.json(noOfFlightsPerMonth);
});


/**
 * @api {get} /topDestinations
 * Top destinations
 * @apiGroup Flights
 *
 * @apiParam {Number} number The numer of destinatinos to be returned.
 * @apiParam {String} [origin] Specify an origin to see how many flights it has to the top destinations. If empty, counts from all origins
 *
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "count":13043,
 *              "faa":"ORD"
 *          },
 *          ...
 *     ]
 */
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
 * @api {get} /meanAirtime
 * Mean air time
 * @apiGroup Flights
 *
 * @apiParam {String} [origin] If specified, the returned array contains a single object with that origin, otherwise returns for all origins.
 * 
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "average":235.37256315953942,
 *              "faa":"ORD"
 *          },
 *          ...
 *     ]
 */
app.get('/meanAirtime', async (req, res) => {
    let origin = req.query.origin;
    let meanAirtimePerOrigin = await service.meanAirtime(origin);
    res.json(meanAirtimePerOrigin);
});


/**
 * @api {get} /weatherObservations
 * Weather observations count
 * @apiGroup Weather
 *
 * @apiParam {String} [origin] If specified, the returned array contains data only for the specified origins, otherwise it contains data for all the origins.
 *
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "count":8700,
 *              "faa":"JFK"
 *          },
 *          ...
 *     ]
 */
app.get('/weatherObservations', async (req, res) => {
    let origin = req.query.origin;
    let weatherObservationPerOrigin = await service.weatherObservations(origin);
    res.json(weatherObservationPerOrigin);
});

/**
 * @api {get} /temperature
 * Get temperatures
 * @apiGroup Weather
 *
 * @apiParam {String} origin The origin for which to return the data.
 *
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "origin":"JFK",
 *              "month":1,
 *              "day":1,
 *              "hour":0,
 *              "temperature":3.2999999999999985
 *          },
 *          ...
 *     ]
 */
app.get('/temperature', async (req, res) => {
    let origin = req.query.origin;
    if (origin == undefined)
        return res.status(400).send("Please specify the origin as query parameter. Ex: ?origin=JFK");
    let temperaturePerOrigin = await service.temperature(origin);
    res.json(temperaturePerOrigin);
});

/**
 * @api {get} /dailyMeanTemperature
 * Daily mean temperature
 * @apiGroup Weather
 *
 * @apiParam {String} [origin] If not specified, returns data for all origins, otherwise returns only for this origin.
 *
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "origin":"JFK",
 *              "month":1,
 *              "day":1,
 *              "average":3.2999999999999985
 *          },
 *          ...
 *     ]
 */
app.get('/dailyMeanTemperature', async (req, res) => {
    let origin = req.query.origin;
    let dailyMeanTemperaturePerOrigin = await service.dailyMeanTemperature(origin);
    res.json(dailyMeanTemperaturePerOrigin);
});

/**
 * @api {get} /meanDepartureArrivalDelay 
 * Mean departure/arrival delay
 * @apiGroup Flights
 *
 * @apiParam {String} [origin] The origin for which to return data. If not specified, data for all origins is returned.
 *
 * @apiSuccessExample {json[]} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *              "mean_Departure_Delay":8.75507169919908,
 *              "mean_Arrival_Delay":-0.07456551525203721,
 *              "faa":"JFK"
 *         },
 *         ...
 *     ]
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
 *         },
 *         ...
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
 *         },
 *         ...
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
 *         },
 *         ...
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
        "Andrei, Daniela and Florin. Test CI/CD11");
});

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`)
})