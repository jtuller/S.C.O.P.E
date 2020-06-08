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
    case "eits":
      let results = args;
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
            op: "3 time magic science",
            dp: "3 time magic science",
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
      let cost = 0;
      let op = 0;
      let dp = 0;
      const magic = 6;
      const military = 0;
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
      for (i = 0; i < 5; i++) {
        let unitNamelen = races[race][i]["name"].length;
        let nextDel = results.search("\n");
        let units = results.substr(unitNamelen + 1, nextDel - unitNamelen - 1);
        resultsObj[i].units = units;
        results = results.substring(nextDel + 1, results.length);
      }
      //calculates Raw OP/DP & Cost
      for (i = 0; i < 5; i++) {
        op = op + resultsObj[i].op * resultsObj[i].units;
        dp = dp + resultsObj[i].dp * resultsObj[i].units;
        cost = cost + resultsObj[i].cost * resultsObj[i].units;
      }
      //Output results
      message.channel.send({
        embed: {
          color: 3447003,
          description: `Cost:${numeral(cost).format("0,0")}\nOP: ${numeral(
            op
          ).format("0,0")}\nDP: ${numeral(dp).format("0,0")}`,
        },
      });
      break;
  }
});
client.login(config.token);
