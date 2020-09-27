module.exports = (client, message, args) => {
  if (args[0] == "-h") {
    message.channel.send(`${message.author} just did something silly`);
    return;
  }
  message.channel.send({
    embed: {
      color: 3447003,
      description: `Hi there! I'm **S.C.O.P.E.** or, *"Specific Calculation Of Power from EiTS
          I am a bot created by Grand Moff for Visual Utopia!`,
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `A list of my commands:
            - !dice | *provides a random number between 0-100*
            - !opdp | *provides a quick OP/DP calc for an army*
            - !eits | *provides the scope of an EiTS result*
            - !ping | *Pong!*
            - !help | You're here, aren't you?,

            Try !ping -h for help with specific commands`,
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `If you're interested in helping out or have any ideas, here's a link to my repository on github:
          https://github.com/CTFries/S.C.O.P.E`,
    },
  });
};
