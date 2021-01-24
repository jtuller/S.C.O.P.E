let string = `Army with 270989 soldiers awaiting your orders, Pirate...

Notforyou is defended by 340039 soldiers who seem to be armed with magic weapons and mithril armor. The city is also defended by 19155 peasants. And has 5327 guard stations.

Notforyou has 675 walls, which will increase our preparation time by 9 day(s).

This city has been blessed!

Our strategists say that we currently have around 22% chance for a successful attack or 23% for a successful siege assault.

We have prepared 24 days for this attack. It will take another 2 days before our soldiers are fully prepared.

They have no resources in the city so there is no point in plundering it.`;
let results = [];
let tempString = string.split(`\n`);
let attackOdds, siegeOdds, wallsAdd, currentPrep, remainingPrep;
for (s in tempString) {
  let words = tempString[s].split(` `);
  if (words.length > 1) {
    switch (words[words.length - 1]) {
      case "day(s).":
        wallsAdd = words[words.length - 2];
        console.log(`walls add ${wallsAdd} days`);
        break;
      case "assault.":
        siegeOdds = words[words.length - 6];
        attackOdds = words[words.length - 13];
        console.log(`siege odds are ${siegeOdds}`);
        console.log(`attack odds are ${attackOdds}`);
        break;
      case "attack.":
        attackOdds = words[words.length - 6];
        console.log(`attack odds are ${attackOdds}`);
        break;
      case "prepared.":
        currentPrep = words[3];
        remainingPrep = words[words.length - 8];
        console.log(`We have prepared ${currentPrep} day(s)`);
        console.log(`${remainingPrep} day(s) of remaining prep`);
        break;
      default:
        break;
    }
  }
}

var WallPrep = parseInt(wallsAdd);
var CurPrep = parseInt(currentPrep);
var RemPrep = parseInt(remainingPrep);
var CurAttack = parseInt(attackOdds.split("%"));
var CurSiege = parseInt(siegeOdds.split("%"));

// Load in variables sent from user
//const WallPrep = 7;
//const CurPrep = 9;
//const RemPrep = 10;
//const CurAttack = 25;
//const CurSiege = 75;

// Total prep value based on user data
const TotPrep = CurPrep + RemPrep;

// Prep remaining both with and without walls
var Prep = [];
var PrepAdvance;

if (RemPrep - WallPrep <= 0) {
  Prep = [RemPrep, 0];
  PrepAdvance = RemPrep;
} else {
  Prep = [RemPrep, RemPrep - WallPrep];
  PrepAdvance = WallPrep;
}

// Convert Attack (0) and Siege (1) percent chance to decimal chance
const startChance = [CurAttack / 100, CurSiege / 100];

// Initialize common variables and arrays
var base,
  exp,
  expSign,
  x6,
  x5,
  x4,
  x3,
  x2,
  x1,
  x0,
  modChance,
  OPDPbase,
  OPDPexp;
var startOPDP = [],
  modOPDP = [];

var i = 0;
for (i = 0; i <= 1; i++) {
  // Initialize Chance -> OPDP conversion
  base = 1 + Math.sign(Math.log10(startChance[i] / 0.5000000001));
  exp = 1 - Math.sign(Math.log10(startChance[i] / 0.5));
  expSign = Math.pow(base, exp);

  // Modified chance value to use with equation set
  modChance = Math.abs(expSign - startChance[i]);

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
  OPDPexp = -Math.sign(Math.log10(startChance[i] / 0.5000000001));

  // Ouput OPDP value
  startOPDP[i] = Math.pow(OPDPbase, OPDPexp);
  modOPDP[i] = startOPDP[i] / CurPrep;
}

var attackChance = [];
var TotAttackChance = [];
var OPDP, leadSign, AllPrep;

// First iteration, full walls
for (j = 0; j <= Prep[0]; j++) {
  // Iterate through Remaining Prep to find %Chance at each tick
  for (i = 0; i <= 1; i++) {
    // OPDP based on current tick iteration
    OPDP = modOPDP[i] * (CurPrep + j);

    // Initialize 6th order polynomial ()
    expSign = -Math.sign(Math.log10(OPDP / 1.0000000001));

    // Execute OPDP -> % Chance equation set
    x6 = 0.7303 * Math.pow(OPDP, 6 * expSign);
    x5 = -4.1767 * Math.pow(OPDP, 5 * expSign);
    x4 = 6.4802 * Math.pow(OPDP, 4 * expSign);
    x3 = -3.1237 * Math.pow(OPDP, 3 * expSign);
    x2 = 0.6429 * Math.pow(OPDP, 2 * expSign);
    x1 = -0.0534 * Math.pow(OPDP, 1 * expSign);
    x0 = 0.0011;

    // Convert equation to useful output
    base = 1 + Math.sign(Math.log10(OPDP / 1.0000000001));
    exp = 1 - Math.sign(Math.log10(OPDP / 1));
    leadSign = Math.pow(base, exp);

    // Add current chance value to array of values
    attackChance[i] = Math.round(
      100 * (leadSign + expSign * (x6 + x5 + x4 + x3 + x2 + x1 + x0))
    );
  }

  if (CurAttack == CurSiege) {
    // Push each iteration into new row
    TotAttackChance.push(attackChance[0]);
  } else {
    // Push each iteration into new row
    TotAttackChance.push([attackChance[0], attackChance[1]]);
  }
}

var noWallChance = [];
var TotNoWallChance = [];

// Second iteration, No Walls
for (j = 0; j <= Prep[1]; j++) {
  // Iterate through Remaining Prep to find %Chance at each tick
  for (i = 0; i <= 1; i++) {
    // OPDP based on current tick iteration
    OPDP = modOPDP[i] * (CurPrep + PrepAdvance + j);

    // Initialize 6th order polynomial ()
    expSign = -Math.sign(Math.log10(OPDP / 1.0000000001));

    // Execute OPDP -> % Chance equation set
    x6 = 0.7303 * Math.pow(OPDP, 6 * expSign);
    x5 = -4.1767 * Math.pow(OPDP, 5 * expSign);
    x4 = 6.4802 * Math.pow(OPDP, 4 * expSign);
    x3 = -3.1237 * Math.pow(OPDP, 3 * expSign);
    x2 = 0.6429 * Math.pow(OPDP, 2 * expSign);
    x1 = -0.0534 * Math.pow(OPDP, 1 * expSign);
    x0 = 0.0011;

    // Convert equation to useful output
    base = 1 + Math.sign(Math.log10(OPDP / 1.0000000001));
    exp = 1 - Math.sign(Math.log10(OPDP / 1));
    leadSign = Math.pow(base, exp);

    // Add current chance value to array of values
    noWallChance[i] = Math.round(
      100 * (leadSign + expSign * (x6 + x5 + x4 + x3 + x2 + x1 + x0))
    );

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

//console.table(TotAttackChance);
//console.table(TotNoWallChance);

var TotChance = [];
var AttackWalls = [];
var SiegeWalls = [];
var NoWallAttack = [];
var NoWallSiege = [];

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
  for (j = i; j <= Prep[0]; j++) {
    NoWallAttack.push("-");
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
  for (j = i; j <= Prep[0]; j++) {
    NoWallAttack.push("-");
    NoWallSiege.push("-");
  }

  var combine = [];
  var lastVal = 0;

  // Combine all arrays into single table
  for (i = 0; i <= Prep[0]; i++) {
    combine.push([
      AttackWalls[i],
      NoWallAttack[i],
      SiegeWalls[i],
      NoWallSiege[i],
    ]);
  }
}

//console.table(AttackWalls);
//console.table(SiegeWalls);
//console.table(NoWallAttack);
//console.table(NoWallSiege);

// Print the table
console.table(combine);
