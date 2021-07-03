// row 3010, column 3019
r = 3010;
c = 3019;
// r= 4; c= 4
prevDiag = r + c - 2;

//use formula for nth triangular number + column index
n = prevDiag * (prevDiag+1) / 2 + c; 


function iterate(n) {
    let value = 20151125;
    for(let i=0; i<n-1; i++) {
        value = value* 252533 % 33554393
    }
    return value;
}

console.log(iterate(1));
console.log(iterate(2));
console.log(iterate(3));
console.log(iterate(4));
console.log(iterate(5));
console.log(iterate(n));
