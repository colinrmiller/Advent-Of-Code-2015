const fs = require('fs');
// const input = fs.readFileSync('./resources/day7.txt').toString().split('\n');
const input = fs.readFileSync('./resources/day24.txt').toString()
    .split('\n')
    .map((elm) => {
        return parseInt(elm)
    }).reverse();


console.log(input);

function calcSum(array) {
    return array.reduce((elm, r) => {
        return elm + r;
    }, 0)
}


function calcQEnt(array) {
    return array.reducer( (elm, r) => {
        return r*elm;
    }, 1)
}

let sumValue = calcSum(input)/3;

let grp1 = [];
let grp2 = [];
let grp3 = [];

// ?? //
function addElm(group, elm) {
    if (calcSum(group) + elm < sumValue) {
        group = group + elm
        return group
    }
    else {
        return undefined;
    }
}


console.log(calcSum(input)/3);


// return set of indexs that sum to sumValue
//  - calc group size and QEprod
    // -- if min group, if min prd save as answer
// run same operation on remaining indices.   

// return index():
    // generate binary strings of length 2**group size

strings = [];
// for (let i=0; i<2**34; i++) {
//     strings.push((i >>> 0).toString(2))
// }
console.log(2**34);

sum = 0
let index = []
while (sum<=sumValue) {


}

