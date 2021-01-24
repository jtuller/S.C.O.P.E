module.exports = (client, message, args) => {
  let targetServer = client.guilds.cache
    .get("772561311451185193")
    .channels.cache.get("802993890831106108");
  args.shift();
  errMessage = {
    embed: {
      color: 3447003,
      description: ` Bug Reported by: ${message.author}\n\n
           ${args}`,
    },
  };

  targetServer.send(errMessage).then(() => {
    message.channel.send("Error report recieved");
  });
};
