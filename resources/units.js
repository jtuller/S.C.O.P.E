module.exports = {
  human: {
    u1: { name: "Swordsmen", op: 3, dp: 2, cost: 200 },
    u2: { name: "Archers", op: 4, dp: 5, cost: 500 },
    u3: { name: "Knights", op: 11, dp: 11, cost: 2500 },
    u4: { name: "Magicians", op: 0, dp: 0, cost: 240 },
    u5: { name: "Catapults", op: 40, dp: 20, cost: 10000 },
    u6: { name: "Peasants", op: 0, dp: 0.05, cost: 0 },
    u7: { name: "Guard Towers", op: 0, dp: 5, cost: 0 },
  },
  elf: {
    u1: { name: "Ghosts", op: 2, dp: 1, cost: 100 },
    u2: { name: "Archers", op: 2, dp: 10, cost: 700 },
    u3: { name: "Riders", op: 7, dp: 10, cost: 1600 },
    u4: { name: "Spellweavers", op: 0, dp: 0, cost: 300 },
    u5: { name: "Archmages", op: "3 * magic", dp: "3 * magic", cost: 4000 },
    u6: { name: "Peasants", op: 0, dp: 0.05, cost: 0 },
    u7: { name: "Guard Towers", op: 0, dp: 5, cost: 0 },
  },
  orc: {
    u1: { name: "Gaia", op: 1, dp: 2, cost: 100 },
    u2: { name: "Hammerthrowers", op: 3, dp: 3, cost: 300 },
    u3: { name: "Ogres", op: 8, dp: 8, cost: 1500 },
    u4: { name: "Shamans", op: 0, dp: 0, cost: 230 },
    u5: { name: "Nazguls", op: 160, dp: 160, cost: 45000 },
    u6: { name: "Peasants", op: 0, dp: 0.05, cost: 0 },
    u7: { name: "Guard Towers", op: 0, dp: 5, cost: 0 },
  },
  dwarf: {
    u1: { name: "Swordsmen", op: 2, dp: 2, cost: 250 },
    u2: { name: "Hammerthrowers", op: 5, dp: 6, cost: 900 },
    u3: { name: "Axemen", op: 10, dp: 8, cost: 2500 },
    u4: { name: "Runemasters", op: 0, dp: 0, cost: 300 },
    u5: { name: "Cavemasters", op: 6, dp: 3, cost: 1000 },
    u6: { name: "Peasants", op: 0, dp: 0.05, cost: 0 },
    u7: { name: "Guard Towers", op: 0, dp: 5, cost: 0 },
  },
  troll: {
    u1: { name: "Hobgoblins", op: 2, dp: 3, cost: 200 },
    u2: { name: "Rockthrowers", op: 5, dp: 4, cost: 500 },
    u3: { name: "Warlords", op: 10, dp: 10, cost: 1600 },
    u4: { name: "Mages", op: 1, dp: 0, cost: 240 },
    u5: { name: "Berserkers", op: 35, dp: 35, cost: 6000 },
    u6: { name: "Peasants", op: 0, dp: 0.05, cost: 0 },
    u7: { name: "Guard Towers", op: 0, dp: 5, cost: 0 },
  },
  halfling: {
    u1: { name: "Farmers", op: 0, dp: 1, cost: 20 },
    u2: { name: "Slingers", op: 2, dp: 2, cost: 150 },
    u3: { name: "Pony riders", op: 6, dp: 4, cost: 800 },
    u4: { name: "Illusionists", op: 0, dp: 0, cost: 240 },
    u5: { name: "Adventurers", op: 8, dp: 8, cost: 1900 },
    u6: { name: "Peasants", op: 0, dp: 0.05, cost: 0 },
    u7: { name: "Guard Towers", op: 0, dp: 5, cost: 0 },
  },
};
