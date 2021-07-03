// https://adventofcode.com/2015/day/4

const md5 = require("blueimp-md5");

console.log(md5('abcdef609043'));

let int = 0;
const key = 'ckczppom'

let test = key+int.toString();
console.log(test);

while (true) {
    test = key+int.toString()
    hash = md5(test)
    if (hash[0]=='0' && hash[1] =='0' && hash[2] == '0' && hash[3] == '0' && hash[4] == '0' && hash[5] == '0') {
        break;
    }
    int++;
    if (int%1000 == 0){
        console.log(int);
    }
}

console.log(int, hash, test);