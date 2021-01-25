const config = require('../config/config.js')
module.exports = (args) => {
    if (args[0] === "-h") {
        // if the -h flag is declared(help) then we return a quick 'how to' on the command
        return {embed: {description: `!Ping doesn't take any arguments, it just pongs... try looking for help with other commands`}};
    } else {
        return {embed: {description: "Pong!"}};
    }

};
