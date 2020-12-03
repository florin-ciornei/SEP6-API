const service = require("./service");

test('to have 1459 origins', async () => {
    let origins = await service.getOrigins();
    expect(origins.length).toBe(1458);
});