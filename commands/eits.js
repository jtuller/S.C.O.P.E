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
        title: "!army",
        description:
          //prettier-ignore
          "!Army is the original command! !opdp takes 3 arguments, **1 required**, *2 optional*:\n\
        > !army *MILSCI MAGSCI* \n\
        > *EITS-PASTE-DUMP-IN-CODE-BLOCK* \n\
        \n\
        An Example: \n\
        > !Army *2 0*\n\
        > **\\\`\\\`\\\` \n\
        > Army from Test Subject\n\
        > Swordsmen:100 \n\
        > Hammerthrowers:0 \n\
        > Axemen:500 \n\
        > Runemasters:8500 \n\
        > Cavemasters:200 \n\
        > Peasants:100 \n\
        > \\\`\\\`\\\`** \n\
        ",
      },
    });
    return;
  } else {
    let op = 0;
    let dp = 0;
    let cost = 0;
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
    const race = raceIdentify(target);
    // Parses units from parsed results
    //calculates Raw Unit OP/DP & Cost
    const unitsObj = target.replace(/:/g, "\n").split("\n");
    let units = [""];
    for (i = 1; i < 7; i++) {
      let unitI = "u".concat(i);
      let unitName = races[race][unitI].name;
      units.push(unitsObj[unitsObj.indexOf(unitName.toLowerCase()) + 1]);
      console.log(units);
      op = isNaN(units[i]) ? op : op + units[i] * races[race][unitI].op;
      dp = isNaN(units[i]) ? dp : dp + units[i] * races[race][unitI].dp;
      cost = isNaN(units[i]) ? cost : cost + units[i] * races[race][unitI].cost;
    }
    op = military ? op * (1 + military / 10) : op;
    dp = military ? dp * (1 + military / 10) : dp;
    //Output results
    message.channel.send({
      embed: {
        color: 3447003,
        description: `Requested by: ${message.author}
        OP/DP for targetName with ${military} military and ${magic} magic.
        ${races[race].u1.name}: ${units[1]}
        ${races[race].u2.name}: ${units[2]}
        ${races[race].u3.name}: ${units[3]}
        ${races[race].u4.name}: ${units[4]}
        ${races[race].u5.name}: ${units[5]}
        ${races[race].u6.name}: ${units[6]}
        **Cost:${numeral(cost).format("0,0")}**
        **OP: ${numeral(op).format("0,0")}**
        **DP: ${numeral(dp).format("0,0")}**`,
      },
      embed: {
        color: 2123412,
        fields: [
          {
            name: "EITS Requested by:",
            value: `${message.author}`,
          },
          {
            name: "Army",
            value: `${races[race].u1.name}: ${numeral(units[1]).format(
              "0,0"
            )}\n${races[race].u2.name}: ${numeral(units[2]).format("0,0")}\n${
              races[race].u3.name
            }: ${numeral(units[3]).format("0,0")}\n${
              races[race].u4.name
            }: ${numeral(units[4]).format("0,0")}\n${
              races[race].u5.name
            }: ${numeral(units[5]).format("0,0")}\n${
              races[race].u6.name
            }: ${numeral(units[6]).format("0,0")}`,
            inline: true,
          },
          {
            name: "Power",
            value: `Military: ${military} \nMagic: ${magic} \nCost: ${numeral(
              cost
            ).format("0,0")}\nOP: ${numeral(op).format("0,0.0")}\nDP: ${numeral(
              dp
            ).format("0,0.0")}`,
            inline: true,
          },
          {
            name: "credit",
            value: "made with :heart: by Grand Moff",
          },
        ],
      },
    });
  }
};
