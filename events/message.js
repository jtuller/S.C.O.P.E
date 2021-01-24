module.exports = (client, message) => {
  // checks to see if prefix is there, and that it wasn't a bot calling it.
  if (!message.content.startsWith(client.config.prefix) || message.author.bot)
    return;

  // Command and Argument Defining.
  let args = [];
  let command;

  // All arguments now handled the same
  args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  command = args.shift().toLowerCase();
  
  // Command Handling.
  let cmd = client.commands.get(command);
  if (!cmd) return;
  console.log(`${command} called by ${message.author} with arguments:${args}`)
  cmd(client, message, args);
};
