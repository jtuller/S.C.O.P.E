const numeral = require("numeral");
const races = require("../resources/units");

function raceIdentify(i) {
  if (i.search("knights:") > 0) {
    return "human";
  } else if (i.search("ghosts:") > 0) {
    return "elf";
  } else if (i.search("ogres:") > 0) {
    return "orc";
  } else if (i.search("axemen:") > 0) {
    return "dwarf";
  } else if (i.search("warlords:") > 0) {
    return "troll";
  } else if (i.search("farmers:") > 0) {
    return "halfling";
  } else {
    return "Error";
  }
}
module.exports = (client, message, args) => {
  if (args[1] == "-h") {
    message.channel.send({
      embed: {
        color: 2123412,
        title: "!Eits",
        description: `!EITS`,
      },
    });
    return;
  } else {
    const results = args[1];
    const target = results
      .match("```(.|\n)*```")[0]
      .substr(3, results.match("```(.|\n)*```")[0].length - 6);
    const magmil = args[1].split(/ +/g);
    const military = Number.isInteger(parseInt(magmil[0], 10))
      ? parseInt(magmil[0], 10)
      : 0;
    const magic = Number.isInteger(parseInt(magmil[1], 10))
      ? parseInt(magmil[1], 10)
      : 0;
    // Identifies Race
    const race = raceIdentify(results);
    console.log(race, military, magic);
    // Parses units from parsed results
    //calculates Raw Unit OP/DP & Cost
    //   for (i = 0; i < 6; i++) {
    //     op = op + resultsObj[i].op * resultsObj[i].units;
    //     dp = dp + resultsObj[i].dp * resultsObj[i].units;
    //     cost = cost + resultsObj[i].cost * resultsObj[i].units;
    //   }
    //   op = military ? op * (1 + military / 10) : op;
    //   dp = military ? dp * (1 + military / 10) : dp;
    //   //Output results
    //   message.channel.send({
    //     embed: {
    //       color: 3447003,
    //       description: `Requested by: ${message.author}
    //       OP/DP for ${targetName} with ${military} military and ${magic} magic.
    //       ${race.u1.name}: ${units[1]}
    //       ${race.u2.name}: ${units[2]}
    //       ${race.u3.name}: ${units[3]}
    //       ${race.u4.name}: ${units[4]}
    //       ${race.u5.name}: ${units[5]}
    //       **Cost:${numeral(cost).format("0,0")}**
    //       **OP: ${numeral(op).format("0,0")}**
    //       **DP: ${numeral(dp).format("0,0")}**`,
    //     },
    //   });
  }
};
