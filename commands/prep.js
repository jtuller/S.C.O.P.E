function prep(troops,citySize){
    calculation = (Math.pow(troops,.3) * citySize/12) + 3
    return calculation

}

module.exports = (client, message, args) => {
    console.log(Number.isInteger(parseInt(args[0])))
    console.log(Number.isInteger(parseInt(args[1])))
    if (Number.isInteger(parseInt(args[1])) && Number.isInteger(parseInt(args[1]))){
    results = prep(args[0], args[1])
    message.channel.send(`${args[0]} troops attacking city size ${args[1]}:\`\`\`00% Walls | ${Math.ceil(results)} ticks\n25% Walls | ${Math.ceil(results*1.25)} ticks\n50% Walls | ${Math.ceil(results*1.5)} ticks\n75% Walls | ${Math.ceil(results*1.75)} ticks\nMax Walls | ${Math.ceil(results*2)} ticks\`\`\``)
    } else {
        message.channel.send({
            embed: {
                color: 2123412,
                description: `!prep is used to estimate the expected length of prep on a target.
                
                It takes two arguements. Number of troops in the attacking army and the city "size". 
    
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
            },
        })
    }
}