// https://adventofcode.com/2015/day/7

const fs = require('fs');
// const input = fs.readFileSync('./resources/day7.txt').toString().split('\n');
const input = fs.readFileSync('./resources/day7test.txt').toString().split('\n');
// const arrayInput = Array.from(input)

toggleRegex = new RegExp('toggle');
turnOnRegex = new RegExp('turn on');
turnOffRegex = new RegExp('turn off');
posXRegex = /\d+(?=,)/g; // find string of any # of digits ending with a comma for x values
posYRegex = /(?<=,)\d+/g; // find string of any # of digits preceded by a comma for y values

// Start Functions

const switchLights = (array, xStart, xEnd, yStart, yEnd, command) => {
    // chages lights in square given by (xStart, xEnd, yStart, yEnd) 
    // command=1 : turn all to 1
    // command=0 : turn to 0
    // command=2 : turn 0->1 && 1->0


    // Part A
    // for (let i=yStart; i<=yEnd; i++) {
    //     for (let j=xStart; j<=xEnd; j++) {
    //         if (command==0) {
    //             array[i][j] = 0
    //         } else if (command==1) {
    //             array[i][j] = 1
    //         } else if (command==2) {
    //             //switch 0 to 1 and 1 to 0
    //             array[i][j] = (array[i][j] + 1)%2
    //         } 
    //     }
    // }

    // Part B
    for (let i=yStart; i<=yEnd; i++) {
        for (let j=xStart; j<=xEnd; j++) {
            if (command==0) {
                if (array[i][j]>0) {
                    array[i][j]-=1;
                }
            } else if (command==1) {
                array[i][j]+=1;
            } else if (command==2) {
                //switch 0 to 1 and 1 to 0
                array[i][j]+=2;
            } 
        }
    }
}

const zeros = (xLen, yLen) => {
    let array = [];
    let line = [];
    for (let i = 0; i<yLen; i++) {
        for (j=0; j<xLen; j++){
            line.push(0);
        }
        array.push(line)
        line = [];
    }
    return array;
}

const countLights = (array) => {
    let count = 0;
    for (let i=0; i<array.length; i++) {
        for (j=0; j<array[i].length; j++){
            count += array[i][j];
        }
    }
    return count;
}

// End Functions







let lights = zeros(1000, 1000);
console.log(lights.length, lights[0].length);

input.forEach((command, index) => {
    console.log(command);

    xPos = input[index].match(posXRegex); 
    yPos = input[index].match(posYRegex); 
    
    if (toggleRegex.test(command)){
        onOffSwitch = 2;
    } else if (turnOnRegex.test(command)) {
        onOffSwitch = 1;
    } else if (turnOffRegex.test(command)) {
        onOffSwitch = 0;
    }
    switchLights(lights, parseInt(xPos[0]), parseInt(xPos[1]), parseInt(yPos[0]), parseInt(yPos[1]), onOffSwitch);
})

console.log(countLights(lights));

