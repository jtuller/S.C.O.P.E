function normalRange() {
    return {
        // todo name these things better
        a: 66.085,
        b: 131.6,
        c: 68.304,
        d: 2,
        e: 0.5,
    }
}

function dwarf() {
    return {
        name: "Dwarf",
        range: normalRange(),
    };
}

function halfling() {
    return {
        name: "Halfling",
        range: normalRange(),
    };
}

function human() {
    return {
        name: "Human",
        range: normalRange(),
    };
}

function orc() {
    return {
        name: "Orc",
        range: normalRange(),
    };
}

function troll() {
    return {
        name: "Troll",
        range: normalRange(),
    };
}

function elf() {
    return {
        name: "Elf",
        range: {
            // todo name these things better
            a: 55.174,
            b: 116.78,
            c: 76.052,
            d: 2,
            e: 0.5,
        }
    };
}

module.exports = {
    parse: (raceName) => {
        switch (raceName.toLowerCase()) {
            case "dwarf"    :
                return dwarf();
            case "elf"      :
                return elf();
            case "halfling" :
                return halfling();
            case "human"    :
                return human();
            case "orc"      :
                return orc();
            case "troll"    :
                return troll();
        }
    }
}
