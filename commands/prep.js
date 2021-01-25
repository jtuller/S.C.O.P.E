function prep(troops, citySize) {
    return (Math.pow(troops, 0.3) * citySize) / 12 + 3;
}

module.exports = (request) => {
    console.log(Number.isInteger(parseInt(request.args[0])));
    console.log(Number.isInteger(parseInt(request.args[1])));
    if (
        Number.isInteger(parseInt(request.args[1])) &&
        Number.isInteger(parseInt(request.args[1]))
    ) {
        let results = prep(request.args[0], request.args[1]);
        return {
            embed: {
                description:
                    `${request.args[0]} troops attacking city size ${
                        request.args[1]
                    }:\`\`\`00% Walls | ${Math.ceil(results)} ticks\n25% Walls | ${Math.ceil(
                        results * 1.25
                    )} ticks\n50% Walls | ${Math.ceil(
                        results * 1.5
                    )} ticks\n75% Walls | ${Math.ceil(
                        results * 1.75
                    )} ticks\nMax Walls | ${Math.ceil(results * 2)} ticks\`\`\``
            }
        };
    } else {
        return {
            embed: {
                color: 2123412,
                description: `!prep is used to estimate the expected length of prep on a target.
                
                It takes two arguments. Number of troops in the attacking army and the city "size". 
    
                > E.g. Attacking a 25600 city with 13245 troops(including magic units)
                > !prep 13245 4
                
                
                **City Sizes:** 
                400 = 1
                6400 = 2
                14400 = 3
                25600 = 4
                40000 = 5
                57600 = 6
                78400 = 7
                90000 = 8
                *based on visual, not actual*`,
            }
        };
    }
};
