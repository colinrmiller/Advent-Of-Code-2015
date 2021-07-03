// https://adventofcode.com/2015/day/11
// read the json file for all of the numbers and..
// Part B. count all the numbers that are not contained in a dictionary that contains a value 'red'

// import * as data from './resources/day12.json';
// // const word = data.name;
// console.log(data); // output 'testing'


const fs = require('fs');
const input = fs.readFileSync('./resources/day12.txt', 'utf-8')
   
    // .split('\n')
    // .replace('{', '\n{'); // add a new line before every new object
// const input = Array.from(input).

const dataReviver = (key, value) => {
    if (!Array.isArray(value)) {
        if (typeof value === "object") {
            for (let ky in value) {
                if (value[ky] == 'red'){
                    return {}
                }
            }
        }
        return value
    }    
    return value
}


const json = JSON.parse(input, dataReviver)
console.log(json);
console.log(JSON.stringify(json).match(/-?\d+/g).reduce((total, num) =>  total + +num,0));

// console.log(json);
// // numberRegex = /\d+/g;
// numberRegex = /-?\d+/g;
// redRegex = new RegExp('red')
// openObjRegex = new RegExp('\{')
// closeObjRegex = new RegExp('\}')

// let sum = 0;
// let valueHold = [0];
// let redFound = [false];
// let arrayDepth = [0];


// const addNumber = (line, pos) => {
//     // console.log(line);
//     let digit = ''
//     let done = false;
//     let isNegative = false;
//     let shiftValue = 0; // count length of interger so that that read loop can skip over the rest of the number
//     if(line[pos] == '-') {
//         pos++;
//         shiftValue++;
//         isNegative = true;
//     }
//     for (let i=pos; i<line.length; i++){
//         if (!done) {
//             if (parseInt(line[i]) != NaN) {
//                 digit += line[i];
//                 if (i > pos) {
//                     shiftValue++;
//                 }
//             } else {
//                 done = true;
//             }
//         }
//     }
//     let value = (parseInt(digit))
//     // sum += value
//     if (isNegative) value *= -1; // make the value negative if the first character is '-'
//     console.log("addNumber:", value);
//     valueHold[valueHold.length-1] = valueHold[valueHold.length-1] + value;
//     return shiftValue;
// }

// function isNumeric(s) {
//     return !isNaN(s - parseFloat(s));
// }



// for (let i=0; i<input.length; i++){
//     for (let j=0; j<input[i].length; j++){
//         if (isNumeric(input[i][j]) || input[i][j] == '-') {
//             // console.log(input[i]);
//             j+=addNumber(input[i], j)  // return the shift value so as not to double count the digits in a number
//         //chek for 'red' in line
//         } else if (input[i][j] == 'r' && j < input[i].length - 2) {
//             if (input[i][j+1] == 'e' && input[i][j+2] == 'd' 
//             && arrayDepth[arrayDepth.length-1] == 0) { 
//                 redFound[arrayDepth.length-1] = true;
//                 // console.log("red found:", input[i]);
//             }
//         } else if (input[i][j] == '{') {
//             redFound.push(redFound[redFound.length-1])
//             console.log("Opening \'{\'}:", redFound);
//             valueHold.push(0);
//             arrayDepth.push(0);
//         } else if (input[i][j] == '}') {
//             console.log("Closing \'}\':", redFound);
//             if (!redFound[redFound.length-1]) {
//                 console.log("Adding:", valueHold);
//                 sum += valueHold.pop();
//                 redFound.pop();
//                 arrayDepth.pop();
//             } else {
//                 console.log("Rejected:", valueHold)
//                 valueHold.pop();
//                 redFound.pop();
//                 arrayDepth.pop();

//             }
//         } else if (input[i][j] == '[') {
//             arrayDepth[arrayDepth.length-1] += 1;
//             if (arrayDepth[arrayDepth.length-1] == 1) {
//                 valueHold.push(0);
//             }
//             console.log('\'[\' opening', arrayDepth);
//         } else if (input[i][j] == ']') {
//             arrayDepth[arrayDepth.length-1] -= 1;
//             console.log('\']\' closing', arrayDepth);
//             if (arrayDepth[arrayDepth.length-1] == 0) {
//                 if (!redFound[redFound.length-1]){
//                     console.log("Adding:", valueHold);
//                     sum += valueHold.pop()
//                 }
//                 else {
//                     console.log("*Rejecting: ", valueHold);
//                     valueHold.pop()
//                 }
//             }            
//         }
//     }
// }

// console.log(sum);

// // input.forEach((inst, index) => {

// //     if (openObjRegex.test(inst)) {
// //         nestedIndex += 1;
// //         reading[nestedIndex] = []
// //         readingIndex[nestedIndex] = []
// //     } else if (closeObjRegex.test(inst)) {
// //         // on closing a dictionary, add all of the stored numbers to the list if no 'red' was
// //         if(read) {
// //             // console.log(readingIndex[nestedIndex]);
// //             reading[nestedIndex].forEach(str => {
// //                 addNumber(str);
// //             })
// //             // console.log(sum);
// //         }
// //         nestedIndex -= 1;
// //         if (lastRed > nestedIndex) {
// //             read = true;
// //             lastRed = Infinity;
// //         }
// //     }    

// //     if (redRegex.test(inst)) {
// //         // console.log(inst, index, nestedIndex);
// //         if (read == true) {
// //             read = false;
// //             lastRed = nestedIndex;
// //         }
// //     }
// //     else if (read){
// //         reading[nestedIndex].push(input[index]);
// //         readingIndex[nestedIndex].push(index);
// //     }
// // })
// // console.log(sum);

// // console.log(input);