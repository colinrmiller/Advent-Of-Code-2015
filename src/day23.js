// https://adventofcode.com/2015/day/7

const fs = require('fs');
// const input = fs.readFileSync('./resources/day7.txt').toString().split('\n');
// const input = fs.readFileSync('./resources/day23.txt').toString().split('\n');
const input = fs.readFileSync('./resources/day23.txt').toString().split('\n');

commandRegex = new RegExp('[h-t]..');

incRegex = new RegExp('inc');
hlfRegex = new RegExp('hlf');
tplRegex = new RegExp('tpl');
jmpRegex = new RegExp('jmp');
jieRegex = new RegExp('jie');
jioRegex = new RegExp('hlf');
digitRegex = /-?\d+/g;
registerRegex = /[a-b]/g;

indexCount = 0;


commands = [];
//load mutations into mutations array
input.forEach( line => {
        command = {};
        command["operation"] = line.match(commandRegex)[0]
        console.log(command["operation"]);
        if (command["operation"] != 'jmp'){
            command["register"] = line.match(registerRegex)[0]
        }
        if (command["operation"][0] == 'j'){
            command["jumpOffset"] = parseInt(line.match(digitRegex)[0])
        }
        commands.push(command)
        
})

console.log(commands);


let a = 1;
let b = 0;
let register;

for (let i=0; i<commands.length; i++){
    let command = commands[i];
    let jump = false;
    console.log('\n', i, command);

    switch (command["register"]) {
        case 'a':
            register = a;
            break;
        case 'b':
            register = b;    
    }

    switch (command["operation"]) {
        case 'inc':
            register++;
            break;
        case 'tpl':
            register *= 3;
            break;
        case 'hlf':
            register *= 0.5;
            break;
        case 'jmp':
            i += command["jumpOffset"] -1 // jump forward or backward in command list by "jumpOffset".  '-1' accounts for increment in for loop
            break;
        case 'jie':
            if (register%2 == 0){
                i += command["jumpOffset"] -1
            }
            break;
        case 'jio':
            if (register == 1){
                i += command["jumpOffset"] -1
            }
    }
    console.log(register, a, b);
    switch (command["register"]) {
        case 'a':
             a = register;
            break;
        case 'b':
             b = register;    
    }

    console.log(a, b);
}


console.log(a, b);