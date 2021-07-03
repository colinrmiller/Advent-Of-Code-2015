// https://adventofcode.com/2015/day/5


// determine the number of nice strings in the day5.txt. 
// a string is nice if it contains at least three vowels
    // at least one double letter ie 'xx'
    // at least one of the following 'aa' 'bb' 'cc' or 'dd'
    // does not contain ab, cd, pq, or xy

const fs = require('fs');
const input = fs.readFileSync('./resources/day5.txt').toString();
const arrayInput = Array.from(input)


/* Part A */

// count = 0;
// vowelCount = 0;
// containsDoubleLetter = false;
// containsInvalidLetter = false;
// previousLetter = undefined;
// lastNewLine = -1;


// arrayInput.forEach( (elm, index) => {
//     if (elm === '\n') {
//         if (containsDoubleLetter && !containsInvalidLetter && vowelCount >= 3) {
//             count++;
//         } 

//         containsDoubleLetter = false;
//         containsInvalidLetter = false;
//         previousLetter = undefined;
//         lastNewLine = index;
//         vowelCount = 0;

        
//     } else {
//         if (elm == 'a' || elm == 'e' || 
//             elm == 'i' || elm == 'o' || elm == 'u') {
//                 vowelCount++;
//         }
//         if (elm == 'b' && previousLetter == 'a' ||
//             elm == 'd' && previousLetter == 'c' ||
//             elm == 'q' && previousLetter == 'p' ||
//             elm == 'y' && previousLetter == 'x') {
//                 containsInvalidLetter = true;
//         }
//         if (elm == previousLetter) {
//                 containsDoubleLetter = true;
//             }
//     }
//     previousLetter = elm;
// });


/* Part B */


count = 0;
doubledLetters = [];
containsDoubleDoubleLetter = false;
containsSandwich = false;
previousLetter = undefined;
lastNewLine = -1;
prevElmSlice = undefined;
previousLetterToPreviousLetter = undefined;


arrayInput.forEach( (elm, index) => {
    if (elm === '\n') {
        if (containsDoubleDoubleLetter && containsSandwich) {
            // Array.niceList.push(true);
            count++;
        }    

        console.log(arrayInput.slice(lastNewLine+1, index).toString());
        console.log('\t', containsDoubleDoubleLetter, containsSandwich);

        doubledLetters = [];
        containsDoubleDoubleLetter = false;
        containsSandwich = false;
        previousLetter = undefined;
        previousLetterToPreviousLetter = undefined;
        
        lastNewLine = index;
        prevElmSlice = undefined;

    } else {
        if (elm == previousLetterToPreviousLetter) {
                containsSandwich = true;
        }
        if (index - lastNewLine >= 4) {
            arrayInput.slice(lastNewLine, index-1).forEach( sliceElm => {
                if (prevElmSlice == arrayInput[index-1] && sliceElm == arrayInput[index]) {
                    containsDoubleDoubleLetter = true;
                }
                // console.log(prevElmSlice, sliceElm, arrayInput[index-1], arrayInput[index]);

                prevElmSlice = sliceElm;
            })

        }
        if (elm == 'b' && previousLetter == 'a' ||
            elm == 'd' && previousLetter == 'c' ||
            elm == 'q' && previousLetter == 'p' ||
            elm == 'y' && previousLetter == 'x') {
                containsInvalidLetter = true;
        }
        if (elm == previousLetter) {
                containsDoubleLetter = true;
            }
    }
    if (previousLetter != undefined) {
        doubledLetters.push(previousLetter + elm);
        previousLetterToPreviousLetter = previousLetter;
    }
    previousLetter = elm;
});

console.log(count);