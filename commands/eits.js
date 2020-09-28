const numeral = require("numeral");
const races = require("../resources/units");

function raceIdentify(i) {
  let words = i.slice(i.length - 1).toString().split('\n').slice(1).toString().split(':').toString().split(',').toString();
  if (words.search("Knights:") > 0) {
    return "human";
  } else if (words.search("Ghosts") > 0) {
    return "elf";
  } else if (words.search("Ogres") > 0) {
    return "orc";
  } else if (words.search("Axemen") > 0) {
    return "dwarf";
  } else if (words.search("Warlords") > 0) {
    return "troll";
  } else if (words.search("Farmers") > 0) {
    return "halfling";
  } else {
    return "Error";
  }
}

module.exports = (client, message, args) => {

  let op = 0;
  let dp = 0;
  let cost = 0;
  let military = 0;
  let magic = 0;

  if(args[0] > 0 && args [1] > 0){
    military = args[0];
    magic = args[1];
  }
  
  let allWords = args.toString().split('\n').slice(1).toString().split(':').toString().split(',');

  unitNames = [allWords[0],allWords[2],allWords[4],allWords[6],allWords[8],allWords[10]];
  units = [allWords[1],allWords[3],allWords[5],allWords[7],allWords[9],allWords[11]];
  
  // Identifies Race
  const raceName = raceIdentify(args);
  const race = races[raceName];

  // Handles elf mess
  if (race.u5.name === "Archmages") {
    let mag = magic > 9 ? 9 : magic;
    race.u5.op = mag * 3;
    race.u5.dp = mag * 3;
  }
  //calculates Raw Unit OP/DP & Cost
  for (i = 1; i < 8; i++) {
    let unitI = "u".concat(i);
    let unitName = race[unitI].name;
    if (i < 7) {
      op = isNaN(units[i-1]) ? op : op + units[i-1] * race[unitI].op;
      dp = isNaN(units[i-1]) ? dp : dp + units[i-1] * race[unitI].dp;
      cost = isNaN(units[i-1]) ? cost : cost + units[i-1] * race[unitI].cost;
    }
  }
  op = military ? op * (1 + military / 10) : op;
  dp = military ? dp * (1 + military / 10) : dp;
  dp = units[7] > 0 ? dp + units[7] * (5 + military) : dp;

  //Output results
  message.channel.send({
    embed: {
      color: 2123412,
      description: ` EITS Requested by: ${message.author}\n
            **Units**
            ${race.u1.name}: ${numeral(units[0]).format("0,0")}\n${race.u2.name
        }: ${numeral(units[1]).format("0,0")}\n${race.u3.name}: ${numeral(
          units[2]
        ).format("0,0")}\n${race.u4.name}: ${numeral(units[3]).format(
          "0,0"
        )}\n${race.u5.name}: ${numeral(units[4]).format("0,0")}\n${race.u6.name
        }: ${numeral(units[5]).format("0,0")}\n${race.u7.name}: ${numeral(
          units[6]
        ).format("0,0")}
            \n**Power**
            Military: ${military} \nMagic: ${magic} \nCost: ${numeral(
          cost
        ).format("0,0")}\nOP: ${numeral(op).format("0,0.0")}\nDP: ${numeral(
          dp
        ).format("0,0.0")}
            /n**credit**
            made with :heart: by Grand Moff`,
    },
  });

}
