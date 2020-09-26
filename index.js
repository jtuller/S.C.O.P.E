// Library calls
const Discord = require("discord.js");
const client = new Discord.Client();
let { readdirSync } = require("fs");

// Config calls
client.config = require("./config.json");
client.commands = new Discord.Collection();

// Command Handler / Setup.
for (const file of readdirSync("./commands/")) {
  if (!file.endsWith(".js")) return;
  let fileName = file.substring(0, file.length - 3);
  let fileContents = require(`./commands/${file}`);
  client.commands.set(fileName, fileContents);
}

// Event Handler / Setup.
for (const file of readdirSync("./events/")) {
  if (!file.endsWith(".js")) return;
  let fileName = file.substring(0, file.length - 3);
  let fileContents = require(`./events/${file}`);
  client.on(fileName, fileContents.bind(null, client));
  delete require.cache[require.resolve(`./events/${file}`)];
}

// Log in and error handling
client
  .login(client.config.token)
  .then(() => {
    if (!client.user.bot) {
      return process.exit();
    }
    console.log(`Client logged in as ${client.user.tag}`);
  })
  .catch((err) => {
    console.error("Error while logging in: " + err);
  });
