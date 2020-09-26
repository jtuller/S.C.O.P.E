module.exports = (client, message) => {
  // checks to see if prefix is there, and that it wasn't a bot calling it.
  if (!message.content.startsWith(client.config.prefix) || message.author.bot)
    return;

  // Command and Argument Defining.
  let args = [];
  let command;
  //EITS handled different due to argument being a string
  if (
    message.content.toLowerCase().startsWith("!eits") ||
    message.content.toLowerCase().startsWith("+eits")
  ) {
    args = [
      "eits",
      message.content
        .toLowerCase()
        .substr(5, message.content.length - 5)
        .trim(),
    ];
    command = "eits";
  }
  if (
    message.content.toLowerCase().startsWith("!atck") ||
    message.content.toLowerCase().startsWith("+atck")
  ) {
    args = [
      "atck",
      message.content
        .toLowerCase()
        .substr(5, message.content.length - 5)
        .trim(),
    ];
    command = "atck";
  }
  // ALl others handled standard
  else {
    args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);
    command = args.shift().toLowerCase();
  }
  // Command Handling.
  let cmd = client.commands.get(command);
  if (!cmd) return;
  console.log(`${command} called with args: ${args}`)
  cmd(client, message, args);
};
