function battlecalc(string) {
let tempString = string.split(`\n`);
let attackOdds, siegeOdds, wallsAdd, currentPrep, remainingPrep;
for (s in tempString) {
    let words = tempString[s].split(` `);
    if (words.length > 1) {
        switch (words[words.length - 1]) {
            case 'day(s).':
                wallsAdd = words[words.length - 2];
                break
            case 'assault.':
                siegeOdds = words[words.length - 6]
                attackOdds = words[words.length - 13]
                break
            case 'attack.':
                attackOdds = words[words.length - 6]
                break
            case 'prepared.':
                currentPrep = words[3]
                remainingPrep = words[words.length - 8]
                break
            default:
                break
        }
    }
}

let WallPrep = parseInt(wallsAdd);
let CurPrep = parseInt(currentPrep);
let RemPrep = parseInt(remainingPrep);
let CurAttack = parseInt(attackOdds.split('%'));
let CurSiege = parseInt(siegeOdds.split('%'));

// Total prep value based on user data
const TotPrep = CurPrep + RemPrep;

// Prep remaining both with and without walls
let Prep = [];
let PrepAdvance;

if ((RemPrep - WallPrep) <= 0) {
    Prep = [RemPrep, 0];
    PrepAdvance = RemPrep;
} else {
    Prep = [RemPrep, (RemPrep - WallPrep)];
    PrepAdvance = WallPrep;
}

// Convert Attack (0) and Siege (1) percent chance to decimal chance 
const startChance = [CurAttack / 100, CurSiege / 100];

// Initialize common variables and arrays
let base, exp, expSign, x6, x5, x4, x3, x2, x1, x0, modChance, OPDPbase, OPDPexp;
let startOPDP = [], modOPDP = [];

let i = 0;
for (i = 0; i <= 1; i++) {
    // Initialize Chance -> OPDP conversion
    base = (1 + Math.sign(Math.log10(startChance[i] / 0.5000000001)));
    exp = (1 - Math.sign(Math.log10(startChance[i] / 0.5)));
    expSign = Math.pow(base, exp);

    // Modified chance value to use with equation set
    modChance = Math.abs(expSign - startChance[i]);

    // Primary 6th order polynomial (Chance 2 OPDP)
    x6 = (-1285.2 * (Math.pow(modChance, (6))));
    x5 = (2157 * (Math.pow(modChance, (5))));
    x4 = (-1411.2 * (Math.pow(modChance, (4))));
    x3 = (455.98 * (Math.pow(modChance, (3))));
    x2 = (-76.797 * (Math.pow(modChance, (2))));
    x1 = (7.5023 * (Math.pow(modChance, (1))));
    x0 = 0.3254;

    // Convert polyomial output to proper OPDP value
    OPDPbase = (x6 + x5 + x4 + x3 + x2 + x1 + x0);
    OPDPexp = (-Math.sign(Math.log10(startChance[i] / 0.5000000001)))

    // Ouput OPDP value
    startOPDP[i] = Math.pow(OPDPbase, OPDPexp);
    modOPDP[i] = startOPDP[i] / CurPrep;

}

let attackChance = [];
let TotAttackChance = [];
let OPDP, leadSign, AllPrep;

// First iteration, full walls
for (j = 0; j <= Prep[0]; j++) {
    // Iterate through Remaining Prep to find %Chance at each tick
    for (i = 0; i <= 1; i++) {

        // OPDP based on current tick iteration
        OPDP = modOPDP[i] * (CurPrep + j);

        // Initialize 6th order polynomial ()
        expSign = (-Math.sign(Math.log10(OPDP / 1.0000000001)));

        // Execute OPDP -> % Chance equation set
        x6 = (0.7303 * (Math.pow(OPDP, (6 * expSign))));
        x5 = (-4.1767 * (Math.pow(OPDP, (5 * expSign))));
        x4 = (6.4802 * (Math.pow(OPDP, (4 * expSign))));
        x3 = (-3.1237 * (Math.pow(OPDP, (3 * expSign))));
        x2 = (0.6429 * (Math.pow(OPDP, (2 * expSign))));
        x1 = (-0.0534 * (Math.pow(OPDP, (1 * expSign))));
        x0 = 0.0011;

        // Convert equation to useful output
        base = (1 + Math.sign(Math.log10(OPDP / 1.0000000001)));
        exp = (1 - Math.sign(Math.log10(OPDP / 1)));
        leadSign = Math.pow(base, exp);

        // Add current chance value to array of values
        attackChance[i] = Math.round(100 * (leadSign + (expSign * (x6 + x5 + x4 + x3 + x2 + x1 + x0))));

    }

    if (CurAttack == CurSiege) {
        // Push each iteration into new row
        TotAttackChance.push(attackChance[0]);
    } else {
        // Push each iteration into new row
        TotAttackChance.push([attackChance[0], attackChance[1]]);
    }
}

let noWallChance = [];
let TotNoWallChance = [];

// Second iteration, No Walls
for (j = 0; j <= Prep[1]; j++) {
    // Iterate through Remaining Prep to find %Chance at each tick
    for (i = 0; i <= 1; i++) {

        // OPDP based on current tick iteration
        OPDP = modOPDP[i] * (CurPrep + PrepAdvance + j);

        // Initialize 6th order polynomial ()
        expSign = (-Math.sign(Math.log10(OPDP / 1.0000000001)));

        // Execute OPDP -> % Chance equation set
        x6 = (0.7303 * (Math.pow(OPDP, (6 * expSign))));
        x5 = (-4.1767 * (Math.pow(OPDP, (5 * expSign))));
        x4 = (6.4802 * (Math.pow(OPDP, (4 * expSign))));
        x3 = (-3.1237 * (Math.pow(OPDP, (3 * expSign))));
        x2 = (0.6429 * (Math.pow(OPDP, (2 * expSign))));
        x1 = (-0.0534 * (Math.pow(OPDP, (1 * expSign))));
        x0 = 0.0011;

        // Convert equation to useful output
        base = (1 + Math.sign(Math.log10(OPDP / 1.0000000001)));
        exp = (1 - Math.sign(Math.log10(OPDP / 1)));
        leadSign = Math.pow(base, exp);

        // Add current chance value to array of values
        noWallChance[i] = Math.round(100 * (leadSign + (expSign * (x6 + x5 + x4 + x3 + x2 + x1 + x0))));

        // Print array of chance values
    }

    if (CurAttack == CurSiege) {
        // Push each iteration into new row
        TotNoWallChance.push(noWallChance[0]);
    } else {
        // Push each iteration into new row
        TotNoWallChance.push([noWallChance[0], noWallChance[1]]);
    }
}

let AttackWalls = [];
let SiegeWalls = [];
let NoWallAttack = [];
let NoWallSiege = [];

if (CurAttack == CurSiege) {

    // Break each Full Wall array into individual components
    for (i = 0; i <= Prep[0]; i++) {
        AttackWalls.push(TotAttackChance[i]);
    }

    // Break each No Wall array into individual components
    for (i = 0; i <= Prep[1]; i++) {
        NoWallAttack.push(TotNoWallChance[i]);
    }

    // Add '-' symbols for each tick after the No Wall max is reached
    for (j = i; j <= (Prep[0]); j++) {
        NoWallAttack.push('-');
    }

    var combine = [];
    var lastVal = 0;

    // Combine all arrays into single table
    for (i = 0; i <= Prep[0]; i++) {
        combine.push([AttackWalls[i], NoWallAttack[i]]);
    }

} else {

    // Break each Full Wall array into individual components
    for (i = 0; i <= Prep[0]; i++) {
        AttackWalls.push(TotAttackChance[i][0]);
        SiegeWalls.push(TotAttackChance[i][1]);
    }

    // Break each No Wall array into individual components
    for (i = 0; i <= Prep[1]; i++) {
        NoWallAttack.push(TotNoWallChance[i][0]);
        NoWallSiege.push(TotNoWallChance[i][1]);
    }

    // Add '-' symbols for each tick after the No Wall max is reached
    for (j = i; j <= (Prep[0]); j++) {
        NoWallAttack.push('-');
        NoWallSiege.push('-');
    }

    var combine = []
    var lastVal = 0;

    // Combine all arrays into single table
    for (i = 0; i <= Prep[0]; i++) {
        combine.push([AttackWalls[i], NoWallAttack[i], SiegeWalls[i], NoWallSiege[i]]);
    }
return combine
}}
const numeral = require("numeral");
module.exports = (client, message, args) => {
    const results = (battlecalc(args[1]))
    console.log(results)
    message.channel.send(`Calculating!`).then(msg => {
        msg.edit(`
            \`\`\`T | A+W | A-W | S+W | S-W\n-------------------------\n${results.map((tick, i) => `${i} | ${numeral(tick[0]).format('00')}% | ${numeral(tick[1]).format('00')}% | ${numeral(tick[2]).format('00')}% | ${numeral(tick[3]).format('00')}% \n`).join('')}\`\`\``);
    });}




