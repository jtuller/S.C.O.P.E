const shell = require("shelljs");
let reportChannel = client.guilds.cache
  .get("772561311451185193")
  .channels.cache.get("802993476345921587");

module.exports = (client, message, args) => {
  if (
    message.author.id === "298154814406131713" ||
    message.author.id === "394276895484805120"
  ) {
    let logged = {
      embed: {
        color: 16580705,
        description: `${message.author} redeployed the bot`,
      },
    };
    reportChannel.send(logged).then(() => {
      message.channel.send({
        embed: {
          color: 16580705,
          description: `Redeploying SCOPE`,
        },
      });
      shell.exec("~/S.C.O.P.E/reload.sh");
    });
  } else {
    let logged = {
      embed: {
        color: 15158332,
        description: `${message.author} attempted to redeploy the bot`,
      },
    };
    reportChannel.send(logged).then(() => {
      message.channel.send({
        embed: {
          color: 15158332,
          description: `${message.author} tried to do something very stupid.`,
        },
      });
    });
  }
};
