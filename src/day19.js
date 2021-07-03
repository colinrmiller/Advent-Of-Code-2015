// https://adventofcode.com/2015/day/5


// determine the number of unique strings that can be made from the given string with one of the given replacements

const fs = require('fs');
const input = fs.readFileSync('./resources/day19.txt').toString().split('\n');
const arrayInput = Array.from(input)



const arrowRegex = new RegExp("=>");
const moleculesRegex = /[A-Z,a-z]\w*/g;
/* Part A */

mutations = []

// set starting sequence
startingSequence = input[input.length-1];

//load mutations into mutations array
input.forEach( line => {
    if (arrowRegex.test(line)) {
        mutation = {};
        mutation["from"] = line.match(moleculesRegex)[0]
        mutation["to"] = line.match(moleculesRegex)[1]
        mutations.push(mutation)
        
    }
})

/* Part A */
// let mutationList = [];
// mutations.forEach( mutation => {
//     startingElm = mutation["from"]
//     for (let i=0; i<startingSequence.length; i++){
//         if (startingSequence[i] === startingElm[0]) {
//             // make sure match check doesn't exceed end of sequence
//             if (i<startingSequence.length - startingElm.length + 1){
//                 let match = true;
//                 // check for match with starting element
//                 for (let j = 0; j < startingElm.length; j++) {
//                     if (startingElm[j] == startingSequence[i+j]) {
//                     }
//                     else match = false;
//                 }
//                 if(match){
//                     let newSequence = stringSplice(startingSequence, i, startingElm.length, mutation["to"])
//                     mutationList.push(newSequence)
//                 }
//             }
//         }
//     }
// })

// mutationList = mutationList.filter((item, pos) => {
//     return mutationList.indexOf(item) == pos;
// })

// console.log(mutationList.length);

/*   End Part A   */


/* Part B */
let mutationList = [startingSequence]
let count = 0;
let found = false;
while (!found) {
    let newMutationList = [];

    mutationList.forEach(str => {

        mutations.forEach( mutation => {

            startingElm = mutation["to"]
            for (let i=0; i<str.length; i++){
                if (str[i] === startingElm[0]) {
                    // make sure match check doesn't exceed end of sequence
                    if (i<str.length - startingElm.length + 1){
                        let match = true;
                        // check for match with starting element
                        for (let j = 0; j < startingElm.length; j++) {
                            if (startingElm[j] == str[i+j]) {
                            }
                            else match = false;
                        }
                        if(match){
                            let newSequence = stringSplice(str, i, startingElm.length, mutation["from"])
                            newMutationList.push(newSequence)
                        }
                    }
                }
            }
        })
    })
    mutationList = newMutationList.filter((item, pos) => {
        return newMutationList.indexOf(item) == pos;
    })
    for (let i=0; i<mutationList.length; i++){
        if (checkIfEmpty(mutationList[i])) {
            found = true
        }
    }
    console.log(count, mutationList.length);
}

console.log(count);



function checkIfEmpty(str) {
// checks if the string is all 'e'
    for (let i = 0; i < str.length; i++) {
        if (str[i] != 'e') {
            return false;
        }
    }    
    return true;
}
/*   End Part B   */









function stringSplice(str, index, removeCount, add) {
    // console.log(str, index, removeCount, add);
    if (index < 0) {
      index = str.length + index;
      if (index < 0) {
        index = 0;
      }
    }
    return str.slice(0, index) + (add || "") + str.slice(index + removeCount);
}

