module.exports = (client, message, args) => {
    let targetServer = client.guilds.cache.get("751880536238063728").channels.cache.get("765596263219462204")
    args.shift();
    errMessage = {
        embed: {
        color: 3447003,
        description: ` Bug Reported by: ${message.author}\n\n
           ${args}`,
      }}
      
    targetServer.send(errMessage).then(() => {
        message.channel.send("Error report recieved");
      });
    };




