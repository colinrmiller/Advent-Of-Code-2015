const fs = require('fs');
const input = fs.readFileSync('./resources/day16.txt').toString().split('\n');
// const input = Array.from(input).

childrenRegex = /(?<=children: )\d+/g;
catsRegex = /(?<=cats: )\d+/g;
samoyedsRegex = /(?<=samoyeds: )\d+/g;
pomeraniansRegex = /(?<=pomeranians: )\d+/g;
akitasRegex = /(?<=akitas: )\d+/g;
vizslasRegex = /(?<=vizslas: )\d+/g;
goldfishRegex = /(?<=goldfish: )\d+/g;
treesRegex = /(?<=trees: )\d+/g;
carsRegex = /(?<=cars: )\d+/g;
perfumesRegex = /(?<=perfumes: )\d+/g;



// children: 3
// cats: 7
// samoyeds: 2
// pomeranians: 3
// akitas: 0
// vizslas: 0
// goldfish: 5
// trees: 3
// cars: 2
// perfumes: 1


let aunts = []
let locations = []
let testOrders = []


// build dictionary for each aunt
input.forEach((inst, index) => {
    let aunt = {};

    children = input[index].match(childrenRegex); 
    cats = input[index].match(catsRegex); 
    samoyeds = input[index].match(samoyedsRegex); 
    pomeranians = input[index].match(pomeraniansRegex); 
    akitas = input[index].match(akitasRegex); 
    vizslas = input[index].match(vizslasRegex); 
    goldfish = input[index].match(goldfishRegex); 
    trees = input[index].match(treesRegex); 
    cars = input[index].match(carsRegex); 
    perfumes = input[index].match(perfumesRegex); 
    if (children != null) {
        aunt["children"] = children[0]; 
    }
    if (cats != null) {
        aunt["cats"] = cats[0]; 
    }
    if (samoyeds != null) {
        aunt["samoyeds"] = samoyeds[0]; 
    }
    if (pomeranians != null) {
        aunt["pomeranians"] = pomeranians[0]; 
    }
    if (akitas != null) {
        aunt["akitas"] = akitas[0]; 
    }
    if (vizslas != null) {
        aunt["vizslas"] = vizslas[0]; 
    }
    if (goldfish != null) {
        aunt["goldfish"] = goldfish[0]; 
    }
    if (trees != null) {
        aunt["trees"] = trees[0]; 
    }
    if (cars != null) {
        aunt["cars"] = cars[0]; 
    }
    if (perfumes != null) {
        aunt["perfumes"] = perfumes[0]; 
    }
    aunts.push(aunt)

})

console.log(aunts);

aunts.forEach((aunt, index) => {
    let found = true;
    if (aunt["children"] != undefined) {
        if (aunt["children"] != 3) {
            found = false
        }
    }
    if (aunt["cats"] != undefined) {
        if (aunt["cats"] <= 7) {
            found = false
        }
    }
    if (aunt["samoyeds"] != undefined) {
        if (aunt["samoyeds"] != 2) {
            found = false
        }
    }    if (aunt["pomeranians"] != undefined) {
        if (aunt["pomeranians"] >= 3) {
            found = false
        }
    }    if (aunt["akitas"] != undefined) {
        if (aunt["akitas"] != 0) {
            found = false
        }
    }    if (aunt["vizslas"] != undefined) {
        if (aunt["vizslas"] != 0) {
            found = false
        }
    }    if (aunt["goldfish"] != undefined) {
        if (aunt["goldfish"] >= 5) {
            found = false
        }
    }    if (aunt["trees"] != undefined) {
        if (aunt["trees"] <= 3) {
            found = false
        }
    }    if (aunt["cars"] != undefined) {
        if (aunt["cars"] != 2) {
            found = false
        }
    }    if (aunt["perfumes"] != undefined) {
        if (aunt["perfumes"] != 1) {
            found = false
        }
    }
    if (found) {
        console.log(index+1);
    }
})