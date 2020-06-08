const Discord = require("discord.js");
const client = new Discord.Client();
const numeral = require("numeral");
const config = require("./config.json");
const prefix = config.prefix;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", async (message) => {
  //ignores bot messages and messages without the prefix
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  const command = message.content.slice(1, 5).toLowerCase();
  const args = message.content.substr(5);
  //const args = message.content.slice(prefix.length).trim().split(/ +/g);

  // Command switch
  switch (command) {
    case "ping":
      message.channel.send("Pong!");
      break;
    case "dice":
      let roll = numeral(Math.random()).multiply(100).format("00.00");
      message.channel.send({
        embed: {
          color: 3447003,
          description: `${roll}`,
        },
      });
      break;
    case "help":
      message.channel.send({
        embed: {
          color: 3447003,
          description: `Hi there! I'm **S.C.O.P.E.** or, *"Specific Calculation Of Power from EiTS
          I am a bot created by Grand Moff for Visual Utopia!`,
        },
      });
      message.channel.send({
        embed: {
          color: 3447003,
          description: `I Currently have two Commands:
            > !Dice
            *This will give you a random roll of the dice 0-100*
            > !eits !mil:# !mag:# 
            > eits-results-pasted-here    
            *this will give you the SCOPE of an Eye in the sky!*
             `,
        },
      });
      message.channel.send({
        embed: {
          color: 3447003,
          description: `If you're interested in helping out or have any ideas, here's a link to my repository on github:
          https://github.com/CTFries/S.C.O.P.E`,
        },
      });
      break;
    case "eits":
      let cost = 0;
      let op = 0;
      let dp = 0;
      let results = args;
      let military =
        results
          .substr(0, results.search("\n"))
          .trim()
          .toLowerCase()
          .search("!mil:") > -1
          ? parseInt(
              results
                .substr(
                  results
                    .substr(0, results.search("\n"))
                    .trim()
                    .toLowerCase()
                    .search("!mil:") + 6,
                  2
                )
                .trim(),
              10
            )
          : 0;
      military = Number.isInteger(military) ? military : 0;
      let magic =
        results
          .substr(0, results.search("\n"))
          .trim()
          .toLowerCase()
          .search("!mag:") > -1
          ? parseInt(
              results.substr(
                results
                  .substr(0, results.search("\n"))
                  .trim()
                  .toLowerCase()
                  .search("!mag:") + 6,
                2
              ),
              10
            )
          : 0;
      magic = Number.isInteger(magic) ? magic : 0;

      const races = {
        Human: [
          {
            name: "Swordsmen",
            cost: 200,
            op: 3,
            dp: 2,
          },
          {
            name: "Archers",
            cost: 500,
            op: 4,
            dp: 5,
          },
          {
            name: "Knights",
            cost: 2500,
            op: 11,
            dp: 11,
          },
          {
            name: "Magicians",
            cost: 240,
            op: 0,
            dp: 0,
          },
          {
            name: "Catapults",
            cost: 10000,
            op: 40,
            dp: 20,
          },
          {
            name: "Peasants",
            cost: 0,
            op: 0,
            dp: 0.5,
          },
        ],
        Elf: [
          {
            name: "Ghosts",
            cost: 100,
            op: 2,
            dp: 1,
          },
          {
            name: "Archers",
            cost: 700,
            op: 2,
            dp: 10,
          },
          {
            name: "Riders",
            cost: 1600,
            op: 7,
            dp: 10,
          },
          {
            name: "Spellweavers",
            cost: 300,
            op: 0,
            dp: 0,
          },
          {
            name: "Archmages",
            cost: 4000,
            op: 3 * magic,
            dp: 3 * magic,
          },
          {
            name: "Peasants",
            cost: 0,
            op: 0,
            dp: 0.5,
          },
        ],
        Orc: [
          {
            name: "Gaia",
            cost: 100,
            op: 1,
            dp: 2,
          },
          {
            name: "Hammerthrowers",
            cost: 00,
            op: 3,
            dp: 3,
          },
          {
            name: "Ogres",
            cost: 1500,
            op: 8,
            dp: 8,
          },
          {
            name: "Shamans",
            cost: 230,
            op: 0,
            dp: 0,
          },
          {
            name: "Nazguls",
            cost: 45000,
            op: 160,
            dp: 160,
          },
          {
            name: "Peasants",
            cost: 0,
            op: 0,
            dp: 0.5,
          },
        ],
        Dwarf: [
          {
            name: "Swordsmen",
            cost: 250,
            op: 2,
            dp: 2,
          },
          {
            name: "Hammerthrowers",
            cost: 900,
            op: 5,
            dp: 6,
          },
          {
            name: "Axemen",
            cost: 2500,
            op: 10,
            dp: 8,
          },
          {
            name: "Runemasters",
            cost: 300,
            op: 0,
            dp: 0,
          },
          {
            name: "Cavemasters",
            cost: 1000,
            op: 6,
            dp: 3,
          },
          {
            name: "Peasants",
            cost: 0,
            op: 0,
            dp: 0.5,
          },
        ],
        Troll: [
          {
            name: "Hobgoblins",
            cost: 200,
            op: 2,
            dp: 3,
          },
          {
            name: "Rockthrowers",
            cost: 500,
            op: 5,
            dp: 4,
          },
          {
            name: "Warlords",
            cost: 1600,
            op: 10,
            dp: 10,
          },
          {
            name: "Mages",
            cost: 240,
            op: 1,
            dp: 0,
          },
          {
            name: "Berserkers",
            cost: 6000,
            op: 35,
            dp: 35,
          },
          {
            name: "Peasants",
            cost: 0,
            op: 0,
            dp: 0.5,
          },
        ],
        Halfling: [
          {
            name: "Farmers",
            cost: 20,
            op: 0,
            dp: 1,
          },
          {
            name: "Slingers",
            cost: 150,
            op: 2,
            dp: 2,
          },
          {
            name: "Pony Riders",
            cost: 800,
            op: 6,
            dp: 4,
          },
          {
            name: "Illusionists",
            cost: 240,
            op: 0,
            dp: 0,
          },
          {
            name: "Adventurers",
            cost: 1900,
            op: 8,
            dp: 8,
          },
          {
            name: "Peasants",
            cost: 0,
            op: 0,
            dp: 0.5,
          },
        ],
      };
      function raceIdentify(i) {
        if (i.search("Knights") > 0) {
          return "Human";
        } else if (i.search("Ghosts") > 0) {
          return "Elf";
        } else if (i.search("Ogres") > 0) {
          return "Orc";
        } else if (i.search("Axemen") > 0) {
          return "Dwarf";
        } else if (i.search("Warlords") > 0) {
          return "Troll";
        } else if (i.search("Farmers") > 0) {
          return "Halfling";
        }
      }
      // Identifies Race
      const race = raceIdentify(results);
      // Identifies Army or City
      const isArmy = results.search("Wreckages") + 1 ? false : true;
      // Parses results to Object
      const trimPoint = results.search(races[race][0]["name"]);
      results = results.substr(trimPoint, results.length);
      const cityTrim = isArmy ? 0 : results.search("Armies in") - 4;
      results = cityTrim ? results.substr(0, cityTrim) : results;
      let resultsObj = races[race];
      for (i = 0; i < 6; i++) {
        let unitNamelen = races[race][i]["name"].length;
        let nextDel = results.search("\n");
        let units = results.substr(unitNamelen + 1, nextDel - unitNamelen - 1);
        resultsObj[i].units = units;
        results = results.substring(nextDel + 1, results.length);
      }
      //calculates Raw Unit OP/DP & Cost
      for (i = 0; i < 6; i++) {
        op = op + resultsObj[i].op * resultsObj[i].units;
        dp = dp + resultsObj[i].dp * resultsObj[i].units;
        cost = cost + resultsObj[i].cost * resultsObj[i].units;
      }
      op = military ? op * (1 + military / 10) : op;
      dp = military ? dp * (1 + military / 10) : dp;
      //Output results
      message.channel.send({
        embed: {
          color: 3447003,
          description: `Mil:${military}\\Mag:${magic} \nCost:${numeral(
            cost
          ).format("0,0")}\nOP: ${numeral(op).format("0,0")}\nDP: ${numeral(
            dp
          ).format("0,0")}`,
        },
      });
      break;
  }
});
client.login(config.token);
