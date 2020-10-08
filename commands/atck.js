const numeral = require("numeral");
function battlecalc(string) {
    let attackOdds = 0, scienceTag = 0, SiegeYN = 'No', Bless = 'No', siegeOdds = 0, wallsAdd = 0, wallsCount = 0, currentPrep = 0, remainingPrep = 0, currentSoldiers = 0, currentTowers = 0, currentPez = 0, TargetName = 0, tempArmyName = 0; ArmyName = 0, ownTroops = 0;
    let tempString = string.split(`\n`);
    for (s in tempString) {
        let words = tempString[s].split(` `);
        if (words.length > 1) {
            switch ((words[words.length - 1]).slice(-3)) {
                case 's).':
                    wallsAdd = words[words.length - 2];
                    wallsCount = words[words.length - 11]
                    break
                case 'lt.':
                    siegeOdds = words[words.length - 6]
                    attackOdds = words[words.length - 13]
                    break
                case 'ck.':
                    attackOdds = words[words.length - 7]
                    siegeOdds = words[words.length - 7]
                    break
                case 'ge.':
                    attackOdds = words[words.length - 12]
                    siegeOdds = '100%';
                    SiegeYN = 'Yes';
                    break
                case 'ed!':
                    Bless = 'Yes';
                    break
                case 'ed.':
                    currentPrep = words[3]
                    remainingPrep = words[words.length - 8]
                    break
                case 'ns.':
                    scienceTag = words.slice(words.indexOf('armor') - 9, words.indexOf('armor') - 4).join(' ');
                    currentSoldiers = words.slice(words.indexOf('soldiers') - 1, words.indexOf('soldiers'))
                    currentTowers = words[words.length - 3]
                    currentPez = words.slice(words.indexOf('peasants.') - 1, words.indexOf('peasants.'))
                    tempTargetName = words.slice(0, words.indexOf('seem') - 6).join(' ');
                    TargetName = tempTargetName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                    break;
                case '...':
                    tempArmyName = words.slice(0, words.indexOf('with')).join(' ');
                    ArmyName = tempArmyName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                    ownTroops = words[words.indexOf('soldiers') - 1]
                default:
                    break
            }
        }
    }

    let tempTag = 0, milLevel = 0, WallPrep = 0, CurPrep = 0, RemPrep = 0, CurAttack = 0, CurSiege = 0;

    WallPrep = parseInt(wallsAdd);
    CurPrep = parseInt(currentPrep);
    RemPrep = parseInt(remainingPrep);
    CurAttack = parseInt(attackOdds.split('%'));
    CurSiege = parseInt(siegeOdds.split('%'));

    console.log(currentSoldiers);
    console.log(currentPez);

    tempTag = scienceTag.split(' ');
    milLevel = 0;
    if (tempTag.includes('mithril') > 0) {
        milLevel = '5+';
    } else if (tempTag.includes("sticks") > 0) {
        milLevel = '0';
    } else if (tempTag.includes("tree") > 0) {
        milLevel = '1';
    } else if (tempTag.includes("strong") > 0) {
        milLevel = '3';
    } else if (tempTag.includes("dwarven") > 0) {
        milLevel = '4';
    } else {
        milLevel = '2';
    }

    // Prep remaining both with and without walls
    let Prep = [];
    let PrepAdvance = 0;

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
    let base = 0, exp = 0, expSign = 0, x6 = 0, x5 = 0, x4 = 0, x3 = 0, x2 = 0, x1 = 0, x0 = 0, modChance = 0, OPDPbase = 0, OPDPexp = 0;
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
    TotAttackChance.push([CurAttack, CurSiege]);
    let OPDP = 0, leadSign = 0;

    // First iteration, full walls
    for (j = 1; j <= Prep[0]; j++) {
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

        TotAttackChance.push([attackChance[0], attackChance[1]]);

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

        // Push each iteration into new row
        TotNoWallChance.push([noWallChance[0], noWallChance[1]]);
    }

    let AttackWalls = [];
    let SiegeWalls = [];
    let NoWallAttack = [];
    let NoWallSiege = [];

    if (CurAttack == 0) {
        // Break each Full Wall array into individual components
        for (i = 0; i <= Prep[0]; i++) {
            AttackWalls.push(' - ');
        }

        // Break each No Wall array into individual components
        for (i = 0; i <= Prep[1]; i++) {
            NoWallAttack.push(' - ');
        }

        // Add '-' symbols for each tick after the No Wall max is reached
        for (j = i; j <= (Prep[0]); j++) {
            NoWallAttack.push(' - ');
        }
    }
    else {
        // Break each Full Wall array into individual components
        for (i = 0; i <= Prep[0]; i++) {
            AttackWalls.push(TotAttackChance[i][0]);
        }

        // Break each No Wall array into individual components
        for (i = 0; i <= Prep[1]; i++) {
            NoWallAttack.push(TotNoWallChance[i][0]);
        }

        // Add '-' symbols for each tick after the No Wall max is reached
        for (j = i; j <= (Prep[0]); j++) {
            NoWallAttack.push(' - ');
        }
    }

    if (CurSiege == 0 || SiegeYN == 'Yes' ) {
        // Break each Full Wall array into individual components
        for (i = 0; i <= Prep[0]; i++) {
            SiegeWalls.push(' - ');
        }

        // Break each No Wall array into individual components
        for (i = 0; i <= Prep[1]; i++) {
            NoWallSiege.push(' - ');
        }

        // Add '-' symbols for each tick after the No Wall max is reached
        for (j = i; j <= (Prep[0]); j++) {
            NoWallSiege.push(' - ');
        }
    } else {
        // Break each Full Wall array into individual components
        for (i = 0; i <= Prep[0]; i++) {
            SiegeWalls.push(TotAttackChance[i][1]);
        }

        // Break each No Wall array into individual components
        for (i = 0; i <= Prep[1]; i++) {
            NoWallSiege.push(TotNoWallChance[i][1]);
        }

        // Add '-' symbols for each tick after the No Wall max is reached
        for (j = i; j <= (Prep[0]); j++) {
            NoWallSiege.push(' - ');
        }
    }


    var combine = []

    // Combine all arrays into single table
    for (i = 0; i <= Prep[0]; i++) {
        combine.push([AttackWalls[i], NoWallAttack[i], SiegeWalls[i], NoWallSiege[i]]);
    }
    return [combine, AttackWalls, SiegeWalls, NoWallAttack, NoWallSiege, Prep, CurPrep, WallPrep, ArmyName, TargetName, wallsCount, ownTroops, currentTowers, currentSoldiers, currentPez, Bless, milLevel, SiegeYN]
}




module.exports = (client, message, args) => {
    const allVals = (battlecalc(args[1]));
    let ticks = 0, attack = 0, siege = 0, attackNW = 0, siegeNW = 0, prepRem = 0, prep = 0, wallPrep = 0;

    ticks = allVals[0];
    attack = allVals[1];
    siege = allVals[2];
    attackNW = allVals[3];
    siegeNW = allVals[4];
    prepRem = allVals[5];
    prep = allVals[6];
    wallPrep = allVals[7];
    ArmyName = allVals[8];
    TargetName = allVals[9];
    wallsCount = allVals[10];
    ownTroops = allVals[11];
    currentTowers = allVals[12];
    currentSoldiers = allVals[13];
    currentPez = allVals[14];
    bless = allVals[15];
    milLevel = allVals[16];
    SiegeYN = allVals[17];

    let aVal = 0, sVal = 0, aValNW = 0, sValNW = 0;
    let chances = [];


    chances.push(`\`\`\`-------------------------\nT  | A+W | A-W | S+W | S-W\n-------------------------`);
    for (i = 0; i < attack.length; i++) {
        aVal = attack[i];
        sVal = siege[i];
        aValNW = attackNW[i];
        sValNW = siegeNW[i];

        if (aVal > 0) {
            aVal = `${numeral(attack[i]).format('00')}%`.substr(0, 3)
        }

        if (sVal > 0) {
            sVal = `${numeral(siege[i]).format('00')}%`.substr(0, 3)
        }

        if (aValNW > 0) {
            aValNW = `${numeral(attackNW[i]).format('00')}%`.substr(0, 3)
        }

        if (sValNW > 0) {
            sValNW = `${numeral(siegeNW[i]).format('00')}%`.substr(0, 3)
        }

        chances.push(`${numeral(i).format('00')}` + ' | ' + aVal + ' | ' + aValNW + ' | ' + sVal + ' | ' + sValNW);

    }
    chances.push(`\nA+W|A-W: Attack chance w or w/o walls\nS+W|S-W: Siege chance w or w/o walls`);
    chances.push(`\`\`\``)
    message.channel.send({
        embed: {
            color: 2123412,
            description: ` Attack Table Requested by: ${message.author}
      **Attacking Army: *${ArmyName}***
      Prepared: *${numeral(prep).format("0")}*
      Remaining: *${numeral(prepRem[0]).format("0")}*
      Wall Prep: *${numeral(wallPrep).format("0")}*
      Troops: *${numeral(ownTroops).format("0,0")}*
      
      **Target: *${TargetName}***
      Military: *${milLevel}*
      Bless: *${bless}*
      Sieged: *${SiegeYN}*
      Walls: *${numeral(wallsCount).format("0,0")}*
      GTs: *${numeral(currentTowers).format("0,0")}*
      Troops: *${numeral(currentSoldiers).format("0,0")}*
      Pez: *${numeral(currentPez).format("0,0")}*
      
      Chances over the remaining ticks:`,
        },
    });
    message.channel.send(chances);
    message.delete({ timeout: 3000 });
}
