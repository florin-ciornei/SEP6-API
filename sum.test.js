const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('expect true to be true', () => {
    expect(true).toBe(true);
});

test('expect 3 less then 5', () => {
    expect(3).toBeLessThan(5);
});