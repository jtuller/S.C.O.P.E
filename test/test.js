const message = require('../events/message');
const army = require('../commands/army');


test('test suite is working', () => {
    expect(true).toBe(true);
});


test('calling army did not break', () => {

    // act
    let result = army("Tester", [100, 45])

    // assert
    expect(result.embed.color).toBe(2123412);
    expect(result.embed.fields.length).toBe(3);
    console.log(result.embed.fields)
});