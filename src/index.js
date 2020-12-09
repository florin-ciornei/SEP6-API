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
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
app.get('/origins', async (req, res) => {
    let origins = await service.getOrigins();
    res.json(origins);
});

//without ?origin returns for all origins, with ?origin=... returns for that specific origin
app.get('/noOfFlightsPerMonth', async (req, res) => {
    let origin = req.query.origin;
    let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth(origin);
    res.json(noOfFlightsPerMonth);
});

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

app.get('/meanAirtime', async (req, res) => {
    let origin = req.query.origin;
    let meanAirtimePerOrigin = await service.meanAirtime(origin);
    res.json(meanAirtimePerOrigin);
});

app.get('/weatherObservation', async (req, res) => {
    let origin = req.query.origin;
    let weatherObservationPerOrigin = await service.weatherObservation(origin);
    res.json(weatherObservationPerOrigin);
});

app.get('/', (req, res) => {
    res.send("Welcome to our SEP6 project !!! A RESTful API built by " +
        "Andrei, Daniela and Florin. ");
});

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`)
})