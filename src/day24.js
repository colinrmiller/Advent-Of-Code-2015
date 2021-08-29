// # find the minimum elements required to sum to one third of the given array
// -- iterate through the choose function with increasing number of choices to find the first possible sum, find the elemnt with the minimum product from the list

const fs = require("fs");
// const input = fs.readFileSync('./resources/day7.txt').toString().split('\n');
//
const input = fs
    .readFileSync("./resources/day24.txt")
    .toString()
    .split("\n")
    .map((elm) => {
        return parseInt(elm);
    })
    .reverse();

console.log(input);

function calcSum(array) {
    return array.reduce((elm, r) => {
        return elm + r;
    }, 0);
}

function calcQEnt(array) {
    return array.reducer((elm, r) => {
        return r * elm;
    }, 1);
}

let sumValue = calcSum(input) / 3;
console.log("sumValue:", sumValue);

// return array with next free index incremented by one and the remaining spots increasing by one
const naiveChooseSum = (array, n, targetSum) => {
    indexList = [];
    foundList = [];

    const increment = (indexArray) => {
        let len = array.length;
        // len = 10; // length of array

        for (let j = 0; j < n; j++) {
            // starting at the right, check if each element is in it's max position

            if (indexArray[n - j - 1] < len - 1 - j) {
                // it it's not
                // calculate the tail, the jth elem incremented plus one, plus each successive position in their minimum position
                let tail = [];
                for (let k = 0; k < j + 1; k++) {
                    // console.log(n, j, k);
                    tail.push(indexArray[n - j - 1] + k + 1);
                }
                // console.log("tail", tail);

                // return the first (n-j) elements
                return indexArray.slice(0, n - 1 - j).concat(tail);
            }
        }
    };
    // create indexList for moving through array
    for (let i = 0; i < n; i++) {
        indexList.push(i);
    }
    console.log("indexList:", indexList);

    while (indexList[0] < array.length - n) {
        // calculate the sum of the chosen elements
        let sum = array
            .filter((value, index) => indexList.includes(index))
            .reduce((elm, r) => {
                return r + elm;
            }, 0);
        // if sum is == target add it to list
        // console.log(indexList, sum);

        if (sum == targetSum) foundList.push(indexList);
        indexList = increment(indexList);
        // console.log("after increment", indexList);
    }
    return foundList;
};

let n = 2;
let foundList = [];
while (foundList.length == 0) {
    foundList = naiveChooseSum(input, n, sumValue);
    n++;
}
console.log(foundList);

let minProd = Infinity;
foundList.forEach((indexList) => {
    let values = input.filter((value, index) => indexList.includes(index));
    // console.log(values);

    let prod = values.reduce((prev, curr) => prev * curr, 1);

    if (prod < minProd) {
        console.log(prod);
        console.log(values, indexList);

        console.log("newmin");
        minProd = prod;
    }
});
console.log(minProd);
