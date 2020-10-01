const numeral = require("numeral");

module.exports = (client, message, args) => {

    let userRace = args[0].toLowerCase();
    let userNum = args[1];
    let MTcount, MTrange;

    if (userRace == 'elf') {
        // if 200 or less, assume scout tick range, so find MTs required
        if (userNum <= 200) {
            MTcount = 55.174 * (Math.pow(userNum, 2)) - 116.78 * userNum + 76.052;
            MTrange = userNum;
        }

        // if over 200, assume MT count is given, so find scout tick range
        else {
            MTrange = (116.78 + Math.pow(116.78 * 116.78 - 4 * 55.174 * (76.052 - userNum), .5)) / (2 * 55.174);
            MTcount = userNum;
        }
    } else {
        // if 200 or less, assume scout tick range, so find MTs required
        if (userNum <= 200) {
            MTcount = 66.085 * (Math.pow(userNum, 2)) - 131.6 * userNum + 68.304;
            MTrange = userNum;
        }

        // if over 200, assume MT count is given, so find scout tick range
        else {
            MTrange = .995687 + 2 * (Math.pow(.00378301 * userNum - .01054616, .5));
            MTcount = userNum;
        }
    }

    message.channel.send({
        embed: {
            color: 2123412,
            description: `Race: ${userRace.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})}
            MT Count: ${numeral(MTcount).format("0,0")}
            MT Range: ${numeral(MTrange).format("0.00")}`,
        },
    });
    message.delete({ timeout: 1000 });
}



