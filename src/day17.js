


sizes = [11, 30, 47, 31, 32, 36, 3, 1, 5, 3, 32, 36, 15, 11, 46, 26, 28, 1, 19, 3];
// sizes = [20, 15, 10, 5, 5]
sizesIndex = [];

totalVolume = 150;
// totalVolume = 25;

function returnTail(array) {
    let returnArray = [];
    for (let i=1; i<array.length; i++){
        returnArray.push(array[i])
        
    }
    return returnArray;
}

let minContainers =  sizes.length;
let minContainersUsed = [[]];
count = 0;
function distributeLiquid(remainingContainers, remainingVolume, containersUsed) {
    let head = remainingContainers[0];
    let tail = returnTail(remainingContainers);
    if (remainingVolume == 0) {
        if (containersUsed.length == 4) {
            minContainers = containersUsed.length;
            minContainersUsed[count] = containersUsed;
            count++
        }
        return 1;
    }
    if (remainingContainers.length == 1) {
        if(remainingVolume == head) {
            if (containersUsed.length == 4) {
                minContainers = containersUsed.length;
                minContainersUsed[count] = containersUsed;
                count++
            }
            return 1;
        }
        else return 0;
    }
    else if (remainingVolume < 0) return 0;
    else return distributeLiquid(tail, remainingVolume - head, [...containersUsed, head]) + distributeLiquid(tail, remainingVolume, containersUsed);
}


console.log(distributeLiquid(sizes, totalVolume, []))

// console.log(count);

console.log(minContainers);
console.log(minContainersUsed);
console.log(count);