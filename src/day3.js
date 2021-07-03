const fs = require('fs');
const text = fs.readFileSync('./resources/day3.txt').toString();
const textArray = Array.from(text);

let count = 0;

visited = [[0, 0]];
visited2 = [[0, 0]];
let x= 0, y = 0;
let x2= 0, y2 = 0;

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

function myIndexOf(arr, value) {
    // returns the index of the first element in a 2d array equal to array:value
    let index = 0;
    let found = false;
    let returnIndex = -1;
    arr.forEach((e) => {
        // console.log(e, value);
        if (arrayEquals(e, value) && !found) {
            returnIndex = index;
            found = true;
        }
        index++;
    })
    return returnIndex;
}

function onlyUnique(value, index, self) {
    return myIndexOf(self, value) ==  index;
  }


textArray.forEach((value, index) => {
    if (value==">") {
        if (index % 2 == 0){
            x++;
            visited.push([x, y])
        } else {
            x2++;
            visited.push([x2, y2])
        }
    } else if (value=="<") {
        if (index % 2 == 0){
            x--;
            visited.push([x, y])
        } else {
            x2--;
            visited.push([x2, y2])
        }
    } else if (value=="^") {
        if (index % 2 == 0){
            y++;
            visited.push([x, y])
        } else {
            y2++;
            visited.push([x2, y2])
        }
    } else if (value=="v") {
        if (index % 2 == 0){
            y--;
            visited.push([x, y])
        } else {
            y2--;
            visited.push([x2, y2])
        }
    } 
});

var unique = visited.filter(onlyUnique);

console.log(unique.length);