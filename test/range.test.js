const range = require("../commands/range");
const fieldUtils = require("../resources/field-utils");


test("test suite is working", () => {
    expect(true).toBe(true);
});


test("calculates correct range for elf with provided towers", () => {
    // arrange
    let request = {args: ["elf", 35743]}

    // act
    let result = range(request)
    let fields = result[0].embed.fields;

    // assert
    console.log(result[0].embed);
    expect(fieldUtils.fieldExists(fields, "MT Count")).toBe(true);
    expect(fieldUtils.fieldExists(fields, "MT Range")).toBe(true);
    expect(fieldUtils.getFieldVal(fields, "MT Range")).toBe("26.51");
    expect(fieldUtils.getFieldVal(fields, "MT Count")).toBe("35,743");
});

test("calculates correct range for non elf with provided towers", () => {
    // arrange
    let request = {args: ["human", 35743]}

    // act
    let result = range(request)
    let fields = result[0].embed.fields;

    // assert
    console.log(result[0].embed);
    expect(fieldUtils.fieldExists(fields, "MT Count")).toBe(true);
    expect(fieldUtils.fieldExists(fields, "MT Range")).toBe(true);
    expect(fieldUtils.getFieldVal(fields, "MT Range")).toBe("24.25");
    expect(fieldUtils.getFieldVal(fields, "MT Count")).toBe("35,743");
});