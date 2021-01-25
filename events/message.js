module.exports = (client, message) => {
    // checks to see if prefix is there, and that it wasn't a bot calling it.
    if (!message.content.startsWith(client.config.prefix) || message.author.bot)
        return;

    // All arguments now handled the same
    let args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    // Command Handling.
    let cmd = client.commands.get(command);
    if (!cmd) return;

    if (cmd === "reload") {
        // reload command still seems to use a lot out of client & message... maybe this is ok?
        cmd(client, message, args);
        return;
    }

    console.log(`${command} called by ${message.author} with arguments:${args}`);

    let request = {authorId: message.author.id, author: message.author, messageString: message.string, args: args};

    message.send(cmd(request));
    message.delete({timeout: 1000});
};
