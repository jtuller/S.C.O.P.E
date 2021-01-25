const numeral = require("numeral");
const races = require("../resources/units");
module.exports = (request) => {
    // verifies number of args
    if (request.args.length < 6 || request.args.length > 8) {
        return {
            embed: {
                color: 10038562,
                description: `!opdp takes 8 arguments, **6 required**, *2 optional*:
        > !opdp **RACE Unit1 Unit2 Unit3 Unit4 Unit5** *MILSCI MAGSCI*
        Example:
        > !opdp **orc 0 0 0 1200 100** *2 0*`,
            },
        };
    }
    // verifies race arg & sets race
    if (!races.hasOwnProperty(request.args[0].toLowerCase())) {
        return {
            embed: {
                color: 10038562,
                description: `!opdp requires a RACE argument:/n
          > !opdp **RACE** Unit1 Unit2 Unit3 Unit4 Unit5 MILSCI MAGSCI
          Please use \`\`orc \`\`,\`\`elf\`\` ,\`\`human\`\`, \`\`halfling\`\`, \`\`troll\`\`, or \`\`dwarf\`\``,
            },
        };
    }
    //verifies remaining request.args are numbers
    for (i = 1; i < request.args.length; i++) {
        if (!Number.isInteger(parseInt(request.args[i], 10))) {
            return {
                embed: {
                    color: 10038562,
                    description: `!opdp takes 8 arguments, **6 required**, *2 optional*:
          > !opdp **RACE Unit1 Unit2 Unit3 Unit4 Unit5** *MILSCI MAGSCI*
          Example:
          > !opdp **orc 0 0 0 1200 100** *2 0*
          You provided:
          > ${request.messageString}
          \`\`${request.args[i]}\`\` is not an integer.`,
                },
            }
        }
    }
    //sets arguments to unit/science values
    const military = request.args[6] ? request.args[6] : 0;
    const magic = request.args[7] ? request.args[7] : 0;
    const race = eval(`races.${request.args[0]}`.toLowerCase());
    let op = 0;
    let dp = 0;
    let cost = 0;
    // Handles elf mess
    if (race.u5.name === "Archmages") {
        race.u5.op = magic * 3;
        race.u5.dp = magic * 3;
    }
    //calculates unit+science values
    for (i = 1; i < 6; i++) {
        let unit = "u".concat(i);
        op = op + request.args[i] * race[unit].op;
        dp = dp + request.args[i] * race[unit].dp;
        cost = cost + request.args[i] * race[unit].cost;
    }
    op = military ? op * (1 + military / 10) : op;
    dp = military ? dp * (1 + military / 10) : dp;
    //returns results
    return {
        embed: {
            color: 2123412,
            fields: [
                {
                    name: "OP/DP Requested by:",
                    value: `${request.author}`,
                },
                {
                    name: "Army",
                    value: `${race.u1.name}: ${numeral(request.args[1]).format("0,0")}\n${
                        race.u2.name
                    }: ${numeral(request.args[2]).format("0,0")}\n${race.u3.name}: ${numeral(
                        request.args[3]
                    ).format("0,0")}\n${race.u4.name}: ${numeral(request.args[4]).format(
                        "0,0"
                    )}\n${race.u5.name}: ${numeral(request.args[5]).format("0,0")}`,
                    inline: true,
                },
                {
                    name: "Power",
                    value: `Military: ${military} \nMagic: ${magic} \nCost: ${numeral(
                        cost
                    ).format("0,0")}\nOP:${numeral(op).format("0,0")}\nDP: ${numeral(
                        dp
                    ).format("0,0")}`,
                    inline: true,
                },
                {
                    name: "credit",
                    value: "made with :heart: by Grand Moff",
                },
            ],
        },
    };
};
