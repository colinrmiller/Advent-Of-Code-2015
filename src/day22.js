// /* Part A */
const  startingBossHp = 71;
const bossDamage = 10;

let successes = []
let totalTurns = 0;

spells = [{"name": "Magic Missle", "cost":8 , "damage": 4},
    {"name": "drain", "cost":73, "damage": 2, "effect": "heal"},
    {"name": "sheild", "cost":113, "damage": 0, "effect":"shield"},
    {"name": "poison", "cost":173, "damage": 0, "effect":"poison"},
    {"name": "recharge", "cost":229, "damage": 0, "effect":"recharge"},
]

let effects = { "shield": {"counter": 0}, 
                "poison": {"counter": 0},
                "recharge": {"counter": 0} 
            }


            let turnHistory = []
function playTurn(mana, hp, bossHp, activeEffects, manaUsed, turnCounter) {
    // console.log(mana, hp, bossHp, manaUsed, turnCounter);
    let currentEffects = activeEffects;
    // console.log(currentEffects);
    //player turn
    let shield = false;
    let poison = false;
    let recharge = false;

    // console.log("\n Turn:", turnCounter);
    if (currentEffects["recharge"]["counter"] > 0) {
        recharge = true;
        mana += 101;
        currentEffects["recharge"]["counter"]--;
    }
    if (currentEffects["shield"]["counter"] > 0) {
        shield = true;
        currentEffects["shield"]["counter"]--;
    }
    if (currentEffects["poison"]["counter"] > 0) {
        poison = true;
        bossHp -= 3;
        currentEffects["poison"]["counter"]--;
    }
    turnCounter++;
    totalTurns++;
    
    for (let i=0; i<spells.length; i++){
        // console.log("Casting:", spells[i]["name"]);
        //choose player turn
        turnHistory.push(spells[i]["name"]);
        
        if (i == 0) {
            bossHp -= 4;
            mana -= 53;
            manaUsed += 53;
        } else if (i == 1) {
            hp += 2;
            bossHp -= 2;
            mana -= 73
            manaUsed += 73
        } else if (i == 2 && !shield) {
            currentEffects["shield"]["counter"] = 6;
            mana -= 113
            manaUsed += 113
        } else if (i == 3 && !poison) {
            currentEffects["poison"]["counter"] = 6;
            mana -= 173
            manaUsed += 173
        } else if (i == 4 && !recharge) {
            currentEffects["recharge"]["counter"] = 5;
            mana -= 229
            mana -= 229
        }   
        // console.log("Hp:", hp, "Mana:", mana, "Boss Hp:", bossHp);

        if (mana < 0) {
            console.log("DEAD: out of mana");
            console.log(turnHistory);
            return false;
        }

        //boss turn
            //boss effects
        // console.log("\nTurn:", turnCounter);
        if (currentEffects["recharge"]["counter"] > 0) {
            recharge = true;
            mana += 101;
            currentEffects["recharge"]["counter"]--;
        } else recharge = false;
        if (currentEffects["shield"]["counter"] > 0) {
            shield = true;
            currentEffects["shield"]["counter"]--;
        } else shield = false
        if (currentEffects["poison"]["counter"] > 0) {
            poison = true;
            bossHp -= 3;
            currentEffects["poison"]["counter"]--;
        } else poison = false

        if (shield) {
            // console.log("Boss hits for 3.  Hp:", hp);
            hp -= 3;
        } else {
            hp -= 10;
            // console.log("Boss hits for 10. Hp:", hp);
        }
        turnCounter++;
        totalTurns++;
        if (bossHp < 0) {
            successes.push(manaUsed)
            console.log(turnHistory);
            return true
        } else if (hp < 0) {
            console.log("DEAD: 0 hp");
            console.log(turnHistory);
            return false
        } else {
            if (turnCounter < 5) {
                playTurn(mana, hp, bossHp, currentEffects, manaUsed, turnCounter) 
            }
            // else
        }
    }
}

playTurn(500, 50, startingBossHp, effects, 0, 0)

console.log(successes);

let minCost = 100000
for (let i=0; i<successes.length; i++){
    if (successes[i][2] < minCost) {
        console.log(successes[i]);
        minCost = successes[i][2];
    }
}
console.log(totalTurns);