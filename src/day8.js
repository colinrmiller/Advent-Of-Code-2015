// https://adventofcode.com/2015/day/5



const fs = require('fs');
const input = fs.readFileSync('./resources/day8.txt').toString().split("\n");



/* Part A */ 
// determine the difference in the set of strings provided between their literal number of characters and the # as read by the computer
// "//" -> difference of 1
// "/"" -> difference of 1
// "/x.." -> difference of 2
count = 0;

for (let i=0; i<input.length; i++){
    console.log(input[i]);
    for (let j=0; j<input[i].length; j++){
        if (input[i][j] == '\\') {
            switch (input[i][j+1]) {
                case '\\': // an escaped \\ is one charachter more than it's output
                    count++;
                    j++;
                    break;
                case '\"':
                    count++;
                    j++;
                    break;
                case 'x': // an escaped \x.. is three characters more than it's output
                    count+=3;
                    j+=3;
            }
        }
    }
    console.log(count);
}
// console.log(input);
console.log(count + 2*input.length); // add in the number of none stored quotations, 2 per line


/* Part B */
count = 0;

for (let i=0; i<input.length; i++){
    console.log(input[i]);
    for (let j=0; j<input[i].length; j++){
        switch (input[i][j]) {
            case '\\': // an escaped \\ is one charachter more than it's output
            count++;
            break;
        case '\"':
            count++;
    }

    }
    console.log(count);
}
// console.log(input);
console.log(count + 2*input.length); // add in the number of none stored quotations, 2 per line