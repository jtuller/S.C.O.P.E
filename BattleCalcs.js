// Load in variables sent from user
const WallPrep = 7;
const CurPrep = 9;
const RemPrep = 10;
const CurAttack = 25;
const CurSiege = 75;

// Total prep value based on user data
const TotPrep = CurPrep + RemPrep;

// Prep remaining both with and without walls
var Prep = [];

if((RemPrep - WallPrep)<=0){
    Prep = [RemPrep,0];
} else{Prep = [RemPrep,(RemPrep - WallPrep)];}

// Convert Attack (0) and Siege (1) percent chance to decimal chance 
const startChance = [CurAttack / 100, CurSiege / 100];

// Initialize common variables and arrays
var base, exp, expSign, x6, x5, x4, x3, x2, x1, x0, modChance, OPDPbase, OPDPexp;
var startOPDP = [], modOPDP = [];

var i=0;
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

var attackChance = [];
var TotAttackChance = [];
var OPDP, leadSign, AllPrep;

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
        attackChance[i] = Math.round(100*(leadSign + (expSign * (x6 + x5 + x4 + x3 + x2 + x1 + x0))));

        // Print array of chance values
    }

    // Push each iteration into new row
    TotAttackChance.push([attackChance[0],attackChance[1]]);
}

var noWallChance = [];
var TotNoWallChance = [];

for (j = 0; j <= Prep[1]; j++) {
    // Iterate through Remaining Prep to find %Chance at each tick
    for (i = 0; i <= 1; i++) {

        // OPDP based on current tick iteration
        OPDP = modOPDP[i] * (CurPrep + WallPrep + j);

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
        noWallChance[i] = Math.round(100*(leadSign + (expSign * (x6 + x5 + x4 + x3 + x2 + x1 + x0))));

        // Print array of chance values
    }

    // Push each iteration into new row
    TotNoWallChance.push([noWallChance[0],noWallChance[1]]);
}

//console.table(TotAttackChance);
//console.table(TotNoWallChance);

var TotChance = [];
var AttackWalls = [];
var SiegeWalls=[];
var NoWallAttack=[];
var NoWallSiege=[];

for (i = 0; i <= Prep[0]; i++) {
    AttackWalls.push(TotAttackChance[i][0]);
    SiegeWalls.push(TotAttackChance[i][1]);
}

for (i=0; i<=Prep[1]; i++){
    NoWallAttack.push(TotNoWallChance[i][0]);
    NoWallSiege.push(TotNoWallChance[i][1]);
}

for(j=i; j<=(Prep[0]); j++){
    NoWallAttack.push('-');
    NoWallSiege.push('-');
}

//console.table(AttackWalls,SiegeWalls);
//console.table(SiegeWalls);
//console.table(NoWallAttack);
//console.table(NoWallSiege);

var combine = [];
var lastVal = 0;

for (i=0; i<=Prep[0]; i++){
    combine.push([AttackWalls[i],NoWallAttack[i],SiegeWalls[i],NoWallSiege[i]]);
}


console.table(combine);

