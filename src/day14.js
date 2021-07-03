// Find the seating arrangement that maximaizes the total happiness of all guests.  

const fs = require('fs');
// const input = fs.readFileSync('./resources/day13.txt').toString().split('\n');
const input = fs.readFileSync('./resources/day14.txt').toString().split('\n');
// const input = Array.from(input).

digitRegex = /-?\d+/g;
const gainRegex = new RegExp(' gain ');
// gainRegex = / gain /g;
// lostRegex = / lose /g;

let contestents = []
let persons = []
let testOrders = []

const raceTime = 2503;


// build dictionary for each relationship
for (let index=0; index<input.length; index++){
    
    let contestent = {};

    contestent["speed"] = parseInt(input[index].match(digitRegex)[0]); 
    contestent["runTime"] = parseInt(input[index].match(digitRegex)[1]); 
    contestent["restTime"] = parseInt(input[index].match(digitRegex)[2]);
    contestent["score"] = 0;

    contestents.push(contestent)

}

function calcDiststance(cntstnt, time) {
    let cycleTime = cntstnt["runTime"] + cntstnt["restTime"]
    let numCycles = Math.floor(time/cycleTime);
    let lastCycle = time % cycleTime;
    if (lastCycle > cntstnt["runTime"]) {
        return (numCycles+1) * cntstnt["runTime"] * cntstnt["speed"]
    } else {
        return ((numCycles) * cntstnt["runTime"] + lastCycle) * cntstnt["speed"] 
    }
}

max = 0;
for (i=0; i<contestents.length; i++){
    if (calcDiststance(contestents[i], raceTime) > max) {
        max = calcDiststance(contestents[i], raceTime)
    }
    
}
console.log(max);


for (let time=1; time<=raceTime; time++){
    let winningIndex = 0;
    let max = 0;

    for (let j=0; j<contestents.length; j++){
        if (calcDiststance(contestents[j], time) > max) {
            max = calcDiststance(contestents[j], time)
            winningIndex = j;
        }
    }

    contestents[winningIndex]["score"]++
}

console.log(contestents);