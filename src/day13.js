// Find the seating arrangement that maximaizes the total happiness of all guests.  

const fs = require('fs');
// const input = fs.readFileSync('./resources/day13.txt').toString().split('\n');
const input = fs.readFileSync('./resources/day13.txt').toString().split('\n');
// const input = Array.from(input).

nameRegex = /[A-Z]\w+/g;
digitRegex = /-?\d+/g;
const gainRegex = new RegExp(' gain ');
// gainRegex = / gain /g;
// lostRegex = / lose /g;

let relationships = []
let persons = []
let testOrders = []


// build dictionary for each relationship
for (let index=0; index<input.length; index++){
    
    let relationship = {};

    relationship["people"] = input[index].match(nameRegex); 
    relationship["value"] = input[index].match(digitRegex)[0];
    if (!gainRegex.test(input[index])) {
        relationship["value"] *= -1
    }
    relationships.push(relationship)
}
// console.log(relationships);

// build list of unique persons
relationships.forEach((relation) => {
    let found = false
    persons.every(personA => {
        console.log(relation["people"][0], personA);
        if (relation["people"][0] == personA) {
            found = true;
            return false;
        } else {
            return true;
        }
    });
    if (!found) {
        persons.push(relation["people"][0])
    }
})

// add me to list for Part B
persons.forEach(person => {
    let relationship = {}
    relationship["people"] = ['me', person]
    relationship["value"] = 0

    relationships.push(relationship)

    relationship = {}
    relationship["people"] = [person, 'me']
    relationship["value"] = 0

    relationships.push(relationship)

})
persons.push('me')



// console.log(persons);
console.log(persons);
let numPeople = persons.length
// Build Permutation
let basePermutation = [];  //==[0,1,2,3,4,5,6]
for (let i=0; i<numPeople; i++){ 
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











function returnRelationValue(personA, personB) {
    // search through list of relations and return the sum of the the two persons relative like and dislike values
    let total = 0;
    let input;
    for (let i=0; i<relationships.length; i++){
        input = relationships[i]
        if (input["people"][0] == personA && input["people"][1] == personB) {
            total += parseInt(input["value"]);
        } else if (input["people"][1] == personA && input["people"][0] == personB) {
            total += parseInt(input["value"]);
        }
    }
    return total
}

function calcDistance(perm) { // go through a given permutation and add todather the total relation values for each pair
    let distance = 0;

    for (let i=0; i<(perm.length-1); i++){
        distance += returnRelationValue(persons[perm[i]], persons[perm[i+1]]);
        // console.log(persons[perm[i]], persons[perm[i+1]]);
        // console.log(distance + returnRelationValue(persons[perm[i]], persons[perm[i+1]]));
    }
    distance += returnRelationValue(persons[perm.length-1], persons[perm[0]]);
    // console.log(persons[perm[perm.length-1]], persons[perm[0]]);
    // console.log("add", returnRelationValue(persons[perm.length-1], persons[perm[0]]));
    // console.log("Distance:", distance, '\n');
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
for (let i=0; i<routeDistances.length; i++){
    if (routeDistances[i] > max) {
        max = routeDistances[i];
        maxIndex = i;
    }
}


let sum = 0;
for (let i=0; i<testOrders[0].length-1; i++){
    // console.log(persons[testOrders[maxIndex][i]], persons[testOrders[maxIndex][i+1]]);
    sum += returnRelationValue(persons[testOrders[maxIndex][i]], persons[testOrders[maxIndex][i+1]])
    // console.log(sum);
}
sum += returnRelationValue(persons[testOrders[maxIndex][testOrders[0].length-1]], persons[testOrders[maxIndex][0]])

// console.log(persons[testOrders[maxIndex][testOrders[0].length-1]], persons[testOrders[maxIndex][1]])


console.log(sum);

for (let i=0; i<testOrders.length; i++){
    (testOrders[i].push(routeDistances[i]))
}
// console.log(testOrders);