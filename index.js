const express = require('express')
const app = express()
const port = 3000
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
    let noOfFlightsPerMonthPerOrigin = await service.getNumberOfFlightsPerMonthPerOrigin();
    res.json(noOfFlightsPerMonthPerOrigin);
});

app.get('/', (req, res) => {
    res.send("asdasdsa");
});

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`)
})