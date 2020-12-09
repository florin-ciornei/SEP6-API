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

app.get('/origins', async (req, res) => {
    let origins = await service.getOrigins();
    res.json(origins);
});

app.get('/noOfFlightsPerMonth', async (req, res) => {
    let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth();
    res.json(noOfFlightsPerMonth);
});

app.get('/noOfFlightsPerMonthPerOrigin', async (req, res) => {
    let noOfFlightsPerMonthPerOrigin = await service.getNumberOfFlightsPerMonthPerOrigin(req.query.origin);
    res.json(noOfFlightsPerMonthPerOrigin);
});

app.get('/topDestinations', async (req, res) => {
    if (req.query.number == undefined)
        return res.status(400).send("Please specify the number of top destinations to be returned");

    let number = parseInt(req.query.number);
    if (isNaN(number))
        return res.status(400).send("Number doesn't appear to be a number!");

    let topDesinations = await service.countTopDestinations(number);
    res.json(topDesinations);
});

app.get('/topDestinationsPerOrigin', async (req, res) => {
    if (req.query.number == undefined)
        return res.status(400).send("Please specify the number of top destinations to be returned");

    let number = parseInt(req.query.number);
    if (isNaN(number))
        return res.status(400).send("Number doesn't appear to be a number!");

    let topDesinations = await service.countTopDestinationsPerOrigin(number, req.query.origin);
    res.json(topDesinations);
});

app.get('/', (req, res) => {
    res.send("REST API for sep 6");
});

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`)
})