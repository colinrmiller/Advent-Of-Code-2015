// https://adventofcode.com/2015/day/11

// find the next password alphabetically that satisfies the given restraints
    // - contains 2 doubled letters
    // - contains a run of three ('abc')
    // - contains no 'i', 'o', or 'l'

count = 0;
doubledLetters = [];
containsDoubleDoubleLetter = false;
containsRunOfThree = false;
containsNoIOL = true;

previousLetter = undefined;
lastNewLine = -1;
prevElmSlice = undefined;
previousLetterToPreviousLetter = undefined;

// startingCode = Array.from("abccxiccxwxba");
startingCode = Array.from("hxbxxyzz");

function incrementLetter(char) {
    let charToAscii = char.charCodeAt();
    if (charToAscii == 122) {
        charToAscii = 97;
    } else if (char == 'i' || char == 'o' || char == 'l') {
        charToAscii+=2;
    } else {
        charToAscii++;
    }
    // console.log(char, String.fromCharCode(charToAscii));
    return String.fromCharCode(charToAscii)
}


function containsDouble(segment) {
    //takes an array of characters and returns a boolean for weather the string has two of the indicated char
    // console.log(segment);
    for (let i=0; i<segment.length-1; i++){
        if (segment[i] == segment[i+1]) { 
            return true
        }
    }
    return false
}

function incrementCode(code) {
    let found = false;

    while (!found) {
        let containsDoubleDoubleLetter = false;
        let containsRunOfThree = false;
        let containsNoIOL = true;
    
        let previousLetter = undefined;
        
        let incrementPos = code.length-1
    
        while (code[incrementPos] == 'z') {
            // set incrementPos to start at begining of tailing string of 'z's
            incrementPos--;
        }
        if(incrementPos<0) {
            incrementPos = 0;
        }
    
        for (let i=incrementPos; i<code.length; i++){
            code[i] = incrementLetter(code[i])
        }
    
    
        //check conditions of proper string
        for (let i=0; i<code.length; i++){
    
            if (code[i] == 'i' || code[i] == 'o' ||
            code[i] == 'l' ) {
                containsNoIOL = false;
            }
            if (code[i] == previousLetter && i>=3) {
                containsDoubleLetter = true;
                containsDoubleDoubleLetter = containsDoubleDoubleLetter || containsDouble(code.slice(0, i-1))
            }
            if (i>1) {
                if (code[i].charCodeAt() == code[i-1].charCodeAt()+1 && code[i].charCodeAt() == code[i-2].charCodeAt()+2) {
                    containsRunOfThree = true;
                }
            }
            previousLetter = code[i];
        }
        
        // console.log(containsDoubleDoubleLetter, containsRunOfThree, containsNoIOL);
    
        if (containsDoubleDoubleLetter && containsRunOfThree && containsNoIOL) {

            return (code);
        } 
    }
    
    }
console.log(incrementCode(startingCode).join(''));