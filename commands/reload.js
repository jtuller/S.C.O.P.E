const shell = require('shelljs')

module.exports = (client, message, args) => {
  if(message.author.id === "298154814406131713" || message.author.id === "394276895484805120"){
    message.channel.send({
      embed: {
        color: 16580705,
        description: `Redeploying SCOPE`,
      },
    })
    shell.exec('~/S.C.O.P.E./reload.sh');
  } else 
  message.channel.send({
    embed: {
      color: 15158332,
      description: `${message.author} tried to do something very stupid.`,
    },
  })  
};
