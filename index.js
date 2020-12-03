const express = require('express')
const app = express()
const port = 3000
const csv = require('csvtojson')
const service = require("./service");

app.get('/origins', async (req, res) => {
    let origins = await service.getOrigins();
    res.json(origins);
});

app.get('/noOfFlightsPerMonth', async (req, res) => {
    let noOfFlightsPerMonth = await service.getNumberOfFlightsPerMonth();
    res.json(noOfFlightsPerMonth);
});

app.get('/', (req, res) => {
    res.send("asdasdsa");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})