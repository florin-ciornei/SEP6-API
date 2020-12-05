const mongoose = require('mongoose');
const Airline = require('../model/airline');
const Airport = require('../model/airport');
const Flight = require('../model/flight');
const Plane = require('../model/plane');
const Weather = require('../model/weather');
const perf = require('execution-time')();

const csv = require('csvtojson');
const {
    count
} = require('../model/airport');

mongoose.connect('mongodb+srv://sepMongo:mongo@cluster0.besa8.mongodb.net/sep6?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to MongoDB via Mongoose");
    await loadData(Airline, "airlines");
    await loadData(Airport, "airports");
    await loadData(Flight, "flights");
    await loadData(Plane, "planes");
    await loadData(Weather, "weather");
    console.log("LOADING DATA COMPLETE!")
});

const chunkSize = 200; //perhaps it can be refactored so it is passed as an argument when running the script

//schema - the name of the schema imported at the begining of this file
//fileName - the name of the .csv file, without exetinsion
const loadData = async (schema, fileName) => {
    console.log(`-----LOADING ${fileName.toUpperCase()}------`);

    //clear existing data in MongoDB
    perf.start();
    await schema.deleteMany({});
    let performanceResult = perf.stop();
    console.log(`Collection cleared in MongoDB in ${performanceResult.time.toFixed(2)}ms`);

    //load data from .csv into an array
    perf.start();
    let dataArray = await csv().fromFile(`./initialDataLoading/files/${fileName}.csv`);
    //replace NA (not available) numbers with undefined, otherwise there is an error when inserting in database because "NA" is trying to be put in the place of the number.
    //TODO this solution is not perfect yet, if there is a string "NA" that's just a string and not a number, it will also be replaced with undefined. Check for key type before replacing.
    let keys = Object.keys(dataArray[0]);
    dataArray.forEach(o => {
        keys.forEach(key => {
            if (o[key] == "NA")
                o[key] = undefined;
        });
    })
    performanceResult = perf.stop();
    console.log(`Data loaded from CSV in ${performanceResult.time.toFixed(2)}ms`);

    perf.start();
    let dataChunked = chunk(dataArray, chunkSize);
    for (let i = 0; i < dataChunked.length; i++) {
        await schema.create(dataChunked[i]);
        console.log(`Chunk ${i+1}/${dataChunked.length} with ${dataChunked[i].length} elements saved!`);
    }
    performanceResult = perf.stop();
    console.log(`Data saved to MongoDB in ${performanceResult.time.toFixed(2)}ms\n`);
}

//splits an array into chunks of ${size}
const chunk = (array, size) => {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
        } else {
            last.push(array[i]);
        }
    }
    return chunked_arr;
}
