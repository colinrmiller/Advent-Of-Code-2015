const increment = (indexArray) => {
    n = 6; // number of indices
    // len = array.length;
    len = 15; // length of array

    for (let j = 0; j < n; j++) {
        // starting at the right, check if each element is in it's max position
        // console.log(j);
        // console.log(indexArray[n - j - 1], len - 1 - j);

        if (indexArray[n - j - 1] < len - 1 - j) {
            // it it's not
            // calculate the tail, the jth elem incremented plus one, plus each successive position in their minimum position
            tail = [];
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

index = [0, 1, 2, 3, 4, 5];
while (index !== undefined) {
    index = increment(index);
    console.log(index);
}
