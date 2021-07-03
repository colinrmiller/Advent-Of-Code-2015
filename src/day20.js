const value = 33100000;


function sumDivisors(n) {
    // sums divisors whose co-product is <= 50
    let val = 0;
    for (let j=1; j<=50; j++){
        if (n%j == 0) {
            // console.log("div:", n, j, n/j);
            val += n/j*11;
            // console.log(val);
        }
    }
    return val
}

// console.log(sumDivisors(100));

function findLowestNumber(n){
    // finds the lowest number whose sum of divisors >= n
    let i = 1;
    while (true) {
        let val = sumDivisors(i);
        if (val >= n) {
            return i
        }
        if ( i%5000 == 0 ) console.log(i, val);
        i++;
    }
}

console.log(findLowestNumber(value))

// console.log(sumDivisors(83160));