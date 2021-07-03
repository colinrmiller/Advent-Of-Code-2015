const fs = require('fs');
const input = fs.readFileSync('./resources/day9.txt').toString().split('\n');
// const input = Array.from(input).

firstCityRegex = /\w+(?= to)/g;
secondCityRegex = /(?<=to )\w*/g;
distanceRegex = /\d+/g;
turnOffRegex = new RegExp('turn off');
posXRegex = /\d+(?=,)/g; // find string of any # of digits ending with a comma for x values
posYRegex = /(?<=,)\d+/g; // find string of any # of digits preceded by a comma for y values

let instructions = []
let locations = []
let testOrders = []


// build dictionary for each instruction
input.forEach((inst, index) => {
    let instruction = {};

    instruction["from"] = input[index].match(firstCityRegex)[0]; 
    instruction["to"] = input[index].match(secondCityRegex)[0];
    instruction["dist"] = input[index].match(distanceRegex)[0];
    instructions.push(instruction)

    instruction = {};

    instruction["to"] = input[index].match(firstCityRegex)[0]; 
    instruction["from"] = input[index].match(secondCityRegex)[0];
    instruction["dist"] = input[index].match(distanceRegex)[0];
    instructions.push(instruction)

})

// build list of unique locations
instructions.forEach((instrct) => {
    let found = false
    locations.every(loc => {
        if (instrct["from"] == loc) {
            found = true;
            return false;
        } else {
            return true;
        }
    });
    if (!found) {
        locations.push(instrct["from"])
    }
})

let numLocs = locations.length
// Build Permutation
let basePermutation = [];  //==[0,1,2,3,4,5,6]
for (i=0; i<numLocs; i++){ 
    basePermutation.push(i)
}

let usedChars = []; // keep track of numbers used in permuation
let permArr = [];
function permute(input) {
    let i, n;
    for (i = 0; i < input.length; i++) {
        n = input.splice(i, 1)[0];
        usedChars.push(n);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, n);
        usedChars.pop();
    }
    return permArr
};

testOrders = permute(basePermutation)


function cityToCityDist(cityA, cityB) {
    for (let i=0; i<instructions.length; i++){
        let input = instructions[i]
        if (input["from"] == cityA && input["to"] == cityB) {
            return parseInt(input["dist"]);
        }
    }
    return undefined
}

function calcDistance(perm) {
    let distance = 0;

    for (let i=0; i<(perm.length-1); i++){
        distance = distance + cityToCityDist(locations[perm[i]], locations[perm[i+1]]);
    }
    // distance += cityToCityDist(locations[perm.length-1], locations[perm[0]]);

    return distance
}


let routeDistances = []
for (let i=0; i<testOrders.length; i++) {
    routeDistances.push(calcDistance(testOrders[i]))
}

let min = 100000000;
let minIndex;
for (i=0; i<routeDistances.length; i++){
    if (routeDistances[i] < min) {
        min = routeDistances[i];
        minIndex = i;
    }
}

let max = 0;
let maxIndex;
for (i=0; i<routeDistances.length; i++){
    if (routeDistances[i] > max) {
        max = routeDistances[i];
        maxIndex = i;
    }
}

console.log(max);
console.log(testOrders[maxIndex]);
console.log(routeDistances.length);
console.log(testOrders.length);