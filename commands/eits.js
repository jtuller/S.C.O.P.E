const numeral = require("numeral");
const races = require("../resources/units");

function raceIdentify(i) {
  let words = i.toString();
  if (words.search("Catapults") > 0) {
    return "human";
  } else if (words.search("Archmages") > 0) {
    return "elf";
  } else if (words.search("Nazgul") > 0) {
    return "orc";
  } else if (words.search("Cavemasters") > 0) {
    return "dwarf";
  } else if (words.search("Berserkers") > 0) {
    return "troll";
  } else if (words.search("Adventurers") > 0) {
    return "halfling";
  } else {
    return "Error";
  }
}

function NameIdentify(i){
  let Owner, Target;
  if (i.search() > 0) {
    return "human";
  }
}

module.exports = (client, message, args) => {

  let op = 0;
  let dp = 0;
  let cost = 0;
  let military = 0;
  let magic = 0;
  let units = [];
  let rawUnits = 0;
  let rawUnknown = 0;
  let rawGTs = 0;
  let GTs = 0;
  let extraArmies = 0;
  let extraTroops = 0;
  let Type,interm,Owner,Target,tempEndOwner,startTarget,endTarget,startOwner,endOwner,tempOwner;

  if(args[0] > 0 && args [1] > 0){
    military = args[0];
    magic = args[1];
  }

  // Army EITS reports
  if(args.length < 10){

    Type = 'Army';
    rawUnits = args.toString().split('\n').slice(1).toString().split(':').toString().split(',');
  
    tempArray = args.toString().split(`,`);

    interm = tempArray.indexOf('from');
    tempEndOwner = tempArray[tempArray.length-1].split(`\n`)[0].replace(':','');

    Target = tempArray.slice(0,interm).join(' ');
    tempOwner = tempArray.slice(interm+1,tempArray.length-1);
    tempOwner.push(tempEndOwner);
  
    Owner = tempOwner.join(' ');
  }
  // City EITS reports
  else{

    Type = 'City';
    rawUnits = args.toString().split(`\n`).slice(1,7).toString().split(`,`).toString().split(`:`).toString().split(`,`);
    rawGTs = args.toString().split(`\n`).slice(12,13).toString().split(`,`).slice(1,2).toString().split(`:`);
    rawUnknown = args.toString().split(`\n`).slice(19,20).toString().split(`,`);
    GTs = rawGTs[1];
    extraArmies = parseInt(rawUnknown[4]);
    extraTroops = parseInt(rawUnknown[6]);

    rawUnits.push("GTs",GTs);

    tempArray = args.toString().split(`,`);

    startTarget = tempArray.indexOf('about');
    endTarget = tempArray.indexOf('');
    startOwner = tempArray.indexOf('by');
    // last part of Owner name
    tempEndOwner = tempArray[tempArray.length - 11].split(`\n`)[0].replace(':','');
    endOwner = tempArray.length-11;
  
    Target = tempArray.slice(startTarget+1,endTarget).join(' ');
    tempOwner = tempArray.slice(startOwner+1,endOwner);
    tempOwner.push(tempEndOwner);
  
    Owner = tempOwner.join(' ');
  }
  
  console.log(Target);
  console.log(Owner);

  for(i=0; i<(rawUnits.length/2); i++){
    units[i] = rawUnits[(i*2)+1];
  }

  // Identifies Race
  const raceName = raceIdentify(rawUnits);
  const race = races[raceName];

  // Handles elf mess
  if (raceName === "elf") {
    let mag = magic > 9 ? 9 : magic;
    race.u5.op = mag * 3;
    race.u5.dp = mag * 3;
  }
  //calculates Raw Unit OP/DP & Cost
  for (i = 1; i < 8; i++) {
    let unitI = "u".concat(i);
    if (i < 7) {
      // units are base 0, so subtract 1
      op = isNaN(units[i-1]) ? op : op + units[i-1] * race[unitI].op;
      dp = isNaN(units[i-1]) ? dp : dp + units[i-1] * race[unitI].dp;
      cost = isNaN(units[i-1]) ? cost : cost + units[i-1] * race[unitI].cost;
    }
  }
  op = military ? op * (1 + military / 10) : op;
  dp = military ? dp * (1 + military / 10) : dp;
  dp = units[6] > 0 ? dp + units[6] * (5 + military) : dp;  // likewise, 6 would be GTs now, not 7

  //Output results
  message.channel.send({
    embed: {
      color: 2123412,
      description: ` EITS Requested by: ${message.author}\n
            **Target ${Type}:**
            ${Target}
            **Owner:**
            ${Owner}

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
            Military Sci: ${military} \nMagic Sci: ${magic} \nCost: ${numeral(
          cost
        ).format("0,0")}\nOP: ${numeral(op).format("0,0.0")}\nDP: ${numeral(
          dp
        ).format("0,0.0")}
            \n **credit**
            made with :heart: by Percy & Moff`,
    },
  });
  message.delete({ timeout: 1000 });
}
