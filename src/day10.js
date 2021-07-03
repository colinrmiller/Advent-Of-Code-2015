// https://adventofcode.com/2015/day/5


// perform 40 iterations where you read the string literally
// ie. 111 -> 31
// 3 -> 13 

let input = '1113122113';
const n = 40

function iteraate(str){
    let currentInt = str[0];
    let count = 1;
    let returnStr = ''

    for (i=1; i<str.length; i++) {
        if (str[i] == currentInt) {
            count++
        }
        else {
            returnStr = returnStr + count + currentInt
            
            currentInt = str[i]
            count = 1
        }
    }
    returnStr = returnStr + count + currentInt
            
    currentInt = str[i]
    count = 1
    return returnStr
}


for (let i=0; i<50; i++) {
    // console.log(input);
    input = iteraate(input)
}


// console.log(input);
console.log(input.length);
