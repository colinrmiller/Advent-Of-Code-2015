// Goes through a string of '(' and ')' and counts the number of opening more than closing

const fs = require('fs');
const { min } = require('moment');
const { isString } = require('util');
const input = fs.readFileSync('./resources/day2.txt').toString();
const arrayInput = Array.from(input)

// console.log(arrayInput);

let sum = 0;
let sumRibbon = 0;
let store = 0;
let numList = [];
let ab, bc, ac = 0;
let intElm = NaN;


const minFunc = (a, b, c) => {
    if (a <= b && a <= c) {
        return a
    }
    if (b <= a && b <= c) {
        return b
    }
    if (c <= b && c <= a) {
        return c
    }
}

const maxFunc = (a, b, c) => {
    if (a >= b && a >= c) {
        return a
    }
    if (b >= a && b >= c) {
        return b
    }
    if (c >= b && c >= a) {
        return c
    }
}

arrayInput.forEach(e => {
    intElm = parseInt(e);
    console.log(e, Number.isInteger(intElm), parseInt(e));
    if (Number.isInteger(intElm)) {
        store = store*10 + parseInt(e);
    } else if (e == 'x' || e == '\n') {
        numList.push(store);
        console.log(numList);
        store = 0;
    } 
    if (e == '\n') {
        ab = numList[0] * numList[1]
        bc = numList[2] * numList[1]
        ac = numList[0] * numList[2]

        // calc area of wrapping paper
        // sum += 2*ab + 2*bc + 2*ac + minFunc(ab, bc, ac)

        // calc length of ribbon
        sumRibbon += 2 * (numList[0] + numList[1] + numList[2]) 
            - 2* maxFunc(numList[0], numList[1], numList[2])
            + numList[0] * numList[1] * numList[2]
        numList = [];
    }
})

console.log(sumRibbon);



// index = 1
// found = false
// Array.from(text).forEach(i => {
//     if (i=="(") {
//         count++;
//         // console.log(i, '+1');
//     }   else if (i == ')') {
//         count--;
//         // console.log(i, '-1');
//         if (count<0 && found == false) {
//             console.log(index);
//             found = true;
//         }
//     }
//     index++
    
// });

// console.log(count);

// console.log(INPUT);