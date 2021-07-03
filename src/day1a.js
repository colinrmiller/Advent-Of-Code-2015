// Goes through a string of '(' and ')' and counts the number of opening more than closing

const fs = require('fs');
const text = fs.readFileSync('./resources/day1.txt').toString();

let count = 0;
index = 1
found = false
Array.from(text).forEach(i => {
    if (i=="(") {
        count++;
        // console.log(i, '+1');
    }   else if (i == ')') {
        count--;
        // console.log(i, '-1');
        if (count<0 && found == false) {
            console.log(index);
            found = true;
        }
    }
    index++
    
});

console.log(count);

// console.log(INPUT);