const numeral = require("numeral");
module.exports = (request) => {
  console.log(request.args);
  let chance = 0,
      base = 0,
      exp = 0,
      expSign = 0,
      modChance = 0,
      x6 = 0,
      x5 = 0,
      x4 = 0,
      x3 = 0,
      x2 = 0,
      x1 = 0,
      x0 = 0,
      OPDPbase = 0,
      OPDPexp = 0,
      OPDP = 0,
      DP = 0,
      OP = 0;

  OP = request.args[0];
  chance = request.args[1] / 100;

  // Initialize Chance -> OPDP conversion
  base = 1 + Math.sign(Math.log10(chance / 0.5000000001));
  exp = 1 - Math.sign(Math.log10(chance / 0.5));
  expSign = Math.pow(base, exp);

  // Modified chance value to use with equation set
  modChance = Math.abs(expSign - chance);

  // Primary 6th order polynomial (Chance 2 OPDP)
  x6 = -1285.2 * Math.pow(modChance, 6);
  x5 = 2157 * Math.pow(modChance, 5);
  x4 = -1411.2 * Math.pow(modChance, 4);
  x3 = 455.98 * Math.pow(modChance, 3);
  x2 = -76.797 * Math.pow(modChance, 2);
  x1 = 7.5023 * Math.pow(modChance, 1);
  x0 = 0.3254;

  // Convert polyomial output to proper OPDP value
  OPDPbase = x6 + x5 + x4 + x3 + x2 + x1 + x0;
  OPDPexp = -Math.sign(Math.log10(chance / 0.5000000001));

  // Ouput OPDP value
  OPDP = Math.pow(OPDPbase, OPDPexp);

  DP = OP / OPDP;

  return {
    embed: {
      color: 2123412,
      fields: [
        {
          name: `**DP requested by**`,
          value: `${request.author}`,
        },
        {
          name: `**Input**`,
          value: `OP: ${numeral(OP).format("0,0")}
                    % Chance: ${numeral(chance * 100).format("0")}%`,
          inline: true,
        },
        {
          name: `**Output**`,
          value: `DP: ${numeral(DP).format("0,0")}
                    OP/DP Ratio: ${numeral(OPDP).format("0.00")}`,
          inline: true,
        },
      ],
    },
  };

};
