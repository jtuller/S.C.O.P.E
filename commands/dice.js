const numeral = require("numeral");
module.exports = (client, message, args) => {
  let roll = numeral(Math.random()).multiply(100).format("00.00");
  message.channel.send({
    embed: {
      color: 3447003,
      description: `${message.author} rolled: **${roll}**`,
    },
  });
};
