module.exports = (client, message, args) => {
  if (args[0] == "-h") {
    // if the -h flag is declared(help) then we return a quick 'how to' on the command
    message.channel.send(
      `!Ping doesn't take any arguments, it just pongs... try looking for help with other commands`
    );
    return;
  }
  // if the first argument ISN'T -h, then we process normally
  else {
    message.delete({ timeout: 3000 });
    message.channel.send("Pong!").then((pongReply) => {
      pongReply.delete({ timeout: 3000 });
    });
    return;
  }
};
