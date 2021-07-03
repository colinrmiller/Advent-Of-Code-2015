// Little Henry Case got a new video game for Christmas. It's an RPG, and he's stuck on a boss. He needs to know what equipment to buy at the shop. He hands you the controller.

// In this game, the player (you) and the enemy (the boss) take turns attacking. The player always goes first. Each attack reduces the opponent's hit points by at least 1. The first character at or below 0 hit points loses.

// Damage dealt by an attacker each turn is equal to the attacker's damage score minus the defender's armor score. An attacker always does at least 1 damage. So, if the attacker has a damage score of 8, and the defender has an armor score of 3, the defender loses 5 hit points. If the defender had an armor score of 300, the defender would still lose 1 hit point.

// Your damage score and armor score both start at zero. They can be increased by buying items in exchange for gold. You start with no items and have as much gold as you need. Your total damage or armor is equal to the sum of those stats from all of your items. You have 100 hit points.

// Here is what the item shop is selling:

// Weapons:    Cost  Damage  Armor
// Dagger        8     4       0
// Shortsword   10     5       0
// Warhammer    25     6       0
// Longsword    40     7       0
// Greataxe     74     8       0

// Armor:      Cost  Damage  Armor
// Leather      13     0       1
// Chainmail    31     0       2
// Splintmail   53     0       3
// Bandedmail   75     0       4
// Platemail   102     0       5

// Rings:      Cost  Damage  Armor
// Damage +1    25     1       0
// Damage +2    50     2       0
// Damage +3   100     3       0
// Defense +1   20     0       1
// Defense +2   40     0       2
// Defense +3   80     0       3
// You must buy exactly one weapon; no dual-wielding. Armor is optional, but you can't use more than one. You can buy 0-2 rings (at most one for each hand). You must use any items you buy. The shop only has one of each item, so you can't buy, for example, two rings of Damage +3.

// For example, suppose you have 8 hit points, 5 damage, and 5 armor, and that the boss has 12 hit points, 7 damage, and 2 armor:

// The player deals 5-2 = 3 damage; the boss goes down to 9 hit points.
// The boss deals 7-5 = 2 damage; the player goes down to 6 hit points.
// The player deals 5-2 = 3 damage; the boss goes down to 6 hit points.
// The boss deals 7-5 = 2 damage; the player goes down to 4 hit points.
// The player deals 5-2 = 3 damage; the boss goes down to 3 hit points.
// The boss deals 7-5 = 2 damage; the player goes down to 2 hit points.
// The player deals 5-2 = 3 damage; the boss goes down to 0 hit points.
// In this scenario, the player wins! (Barely.)

// You have 100 hit points. The boss's actual stats are in your puzzle input. What is the least amount of gold you can spend and still win the fight?


// /* Part A */
weapons = [{"name": "Dagger", "cost":8 , "damage": 4, "armor":0},
    {"name": "Shortsword", "cost":10, "damage": 5, "armor":0},
    {"name": "Warhammer", "cost":25, "damage": 6, "armor":0},
    {"name": "Longsword", "cost":40, "damage": 7, "armor":0},
    {"name": "Greataxe", "cost":74, "damage": 8, "armor":0}
]

armors = [
    {"name": "Leather", "cost": 13, "damage": 0, "armor": 1},
    {"name": "Chainmail", "cost": 31, "damage": 0, "armor": 2},
    {"name": "Splintmail", "cost": 53, "damage": 0, "armor": 3},
    {"name": "Bandedmail", "cost": 75, "damage": 0, "armor": 4},
    {"name": "Platemail", "cost": 102, "damage": 0, "armor": 5},
    {"name": "none", "cost": 0, "damage": 0, "armor": 0}
]

rings = [
    {"name": "Damage +1", "cost": 25, "damage": 1, "armor": 0},
    {"name": "Damage +2", "cost": 50, "damage": 2, "armor": 0},
    {"name": "Damage +3", "cost": 100, "damage": 3, "armor": 0},
    {"name": "Defense +1", "cost": 20, "damage": 0, "armor": 1},
    {"name": "Defense +2", "cost": 40, "damage": 0, "armor": 2},
    {"name": "Defense +3", "cost": 80, "damage": 0, "armor": 3},
]


const bossHP = 109;
// const bossHP = 12;
const bossDamage = 8;
// const bossDamage = 7;
const bossArmor = 2;

let successes = []
let failures = []

function fight(damage, armor, cost){
    // return true if you win and false if you lose
    // let hp = 8;
    let hp = 100;
    let damageGiven = Math.max(damage - bossArmor, 1)
    let damageTaken = Math.max(bossDamage - armor, 1)

    let turnsForPlayerKill = Math.ceil(bossHP / damageGiven);
    let turnsForBossKill = Math.ceil(hp / damageTaken);
    console.log(damageGiven, turnsForPlayerKill, damageTaken, turnsForBossKill);
    if (turnsForBossKill < turnsForPlayerKill) {
        failures.push([damage, armor, cost])
        return false;
    } else {
        successes.push([damage, armor, cost])
        return true
    }
}



for (let i=0; i<weapons.length; i++){
    let cost = 0;
    let damage = 0;
    let armor = 0; 
    cost += weapons[i]["cost"];
    damage += weapons[i]["damage"];

    if (!fight(damage, armor, cost)){
        for (let j=0; j<armors.length; j++) {
            cost +=  armors[j]["cost"];
            armor += armors[j]["armor"];
            if (!fight(damage, armor, cost)){
                for (let k=0; k<rings.length; k++) {
                    cost +=  rings[k]["cost"];
                    armor += rings[k]["armor"];
                    damage += rings[k]["damage"];
                    if (!fight(damage, armor, cost)){
                        for (let l=0; l<rings.length; l++) {
                            if (l != k) {
                                cost +=  rings[l]["cost"];
                                armor += rings[l]["armor"];
                                damage += rings[l]["damage"];
                                if (fight(damage, armor, cost)) {

                                    // console.log("\t", i, j, k, l);
                                }
                                cost -=  rings[l]["cost"];
                                armor -= rings[l]["armor"];
                                damage -= rings[l]["damage"];
                            }
                        }
                        
                    } 
                    cost -=  rings[k]["cost"];
                    armor -= rings[k]["armor"];
                    damage -= rings[k]["damage"];
                }
            } 
            cost -=  armors[j]["cost"];
            armor -= armors[j]["armor"];
        }

        
    }
        // console.log("\t", i, 0, 0, 0);
}

let maxCost = 0;
let minCost = 1000
for (let i=0; i<successes.length; i++){
    if (successes[i][2] < minCost) {
        console.log(successes[i]);
        minCost = successes[i][2];
    }
}
for (let i=0; i<failures.length; i++){
    if (failures[i][2] > maxCost) {
        console.log(failures[i]);
        maxCost = failures[i][2];
    }
}

console.log(maxCost);


console.log(fight(1, 5))



/* Part B */
