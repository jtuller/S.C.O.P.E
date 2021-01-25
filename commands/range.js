const numeral = require("numeral");

module.exports = (request) => {
    let userRace = request.args[0].toLowerCase();
    let userNum = request.args[1];
    let MTcount, MTrange;

    if (userRace === "elf") {
        // if 200 or less, assume scout tick range, so find MTs required
        if (userNum <= 200) {
            MTcount = 55.174 * Math.pow(userNum, 2) - 116.78 * userNum + 76.052;
            MTrange = userNum;
        }

        // if over 200, assume MT count is given, so find scout tick range
        else {
            MTrange =
                (116.78 +
                    Math.pow(116.78 * 116.78 - 4 * 55.174 * (76.052 - userNum), 0.5)) /
                (2 * 55.174);
            MTcount = userNum;
        }
    } else {
        // if 200 or less, assume scout tick range, so find MTs required
        if (userNum <= 200) {
            MTcount = 66.085 * Math.pow(userNum, 2) - 131.6 * userNum + 68.304;
            MTrange = userNum;
        }

        // if over 200, assume MT count is given, so find scout tick range
        else {
            MTrange = 0.995687 + 2 * Math.pow(0.00378301 * userNum - 0.01054616, 0.5);
            MTcount = userNum;
        }
    }

    return {
        embed: {
            color: 2123412,
            description: `Race: ${userRace.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })}
            MT Count: ${numeral(MTcount).format("0,0")}
            MT Range: ${numeral(MTrange).format("0.00")}`,
        },
    };

};
