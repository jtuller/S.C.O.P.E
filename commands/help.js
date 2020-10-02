module.exports = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 3447003,
      description: `Hi there! I'm **S.C.O.P.E.** or, *"Specific Calculation Of Power from EiTS"*
          I am a bot created by Grand Moff and Percy for Visual Utopia!`,
    },
  });
  message.channel.send({
    embed: {
      color: 3447003,
      description: `A list of my commands:

            **!eits** **|** calculates OP, DP, troop cost
            Format **|** !eits military magic *"paste"*
            __EX: !eits 7 4 *"paste"*__

            **!atck** **|** attack chances over prep
            Format **|** !atck military magic *"paste"*
            __EX: !atck 7 4 *"paste"*__

            **!range** **|** MT range estimation
            Format  **|** !range race number
            __EX: !range elf 2500__
            **Note:**
            over 200: MT input, tick output
            under 200: tick input, MT output
            `
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
