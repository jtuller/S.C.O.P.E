module.exports = (client, message, args) => {
    errMessage = `${command} called by ${message.author} with arguments:${args}`
    client.guilds.get(751880536238063728).channels.get(765596263219462204).send(errMessage)
    };




