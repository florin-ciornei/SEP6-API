const service = require("./service");

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sepMongo:mongo@cluster0.besa8.mongodb.net/sep6?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MongoDB via Mongoose");
    });


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

afterAll(async () => {
    return await mongoose.disconnect();
});