// https://adventofcode.com/2015/day/7

const fs = require('fs');
// const input = fs.readFileSync('./resources/day7.txt').toString().split('\n');
const input = fs.readFileSync('./resources/day7.txt').toString().split('\n');

// andRegex = new RegExp('AND');
// orRegex = new RegExp('OR');
// rShiftRegex = new RegExp('RSHIFT');
// lShiftRegex = new RegExp('LSHIFT');
// notRegex = new RegExp('NOT');
commandRegex = /OR|AND|RSHIFT|LSHIFT|NOT/g;
digitRegex = /\d+/g;
portRegex = /[a-z]{1,2}/g;

indexCount = 0;




commands = [];
ports = []
//load mutations into mutations array


function addPrt(prt) {
    // add prt to ports, if it's not already there
    let found = false
    for (let i=0; i<ports.length; i++){
        if (prt == ports[i]["id"]) {
            found = true;
        }
    }
    if (!found) {
        port = {}
        port["id"] = prt
        port["value"] = undefined
        ports.push(port)
    }
}

function setValue(prt, value) {
    let found = false;
    for (let i=0; i<ports.length; i++){
        if (prt == ports[i]["id"]) {
            if (ports[i]["value"] == undefined){
                ports[i]["value"] = value
                found = true;
            }
        }
    }
    return found;
}

function getValue(prt) {
    let found = false;
    for (let i=0; i<ports.length; i++){
        if (prt == ports[i]["id"] && ports[i]["value"]!= undefined) {
            return ports[i]["value"];
        }
    }
    return undefined;
}

function valueDefined(prt) {
    for (let i=0; i<ports.length; i++){
        if (prt == ports[i]["id"] && ports[i]["value"]!= undefined) {
            return true;
        }
    }
    return false;
}


input.forEach( line => {
        command = {};

        // read command operation
        cmnd = line.match(commandRegex)
        if (cmnd == undefined) {
            command["operation"] = "ASSIGNMENT"
        } else command["operation"] = cmnd[0];

        // read ports
        prts = line.match(portRegex)
        prts.forEach(prt => addPrt(prt)) // add each port to ports list

        command["output"] = prts.slice(-1)[0]

        switch(command["operation"]) {
            case "AND":
            case "OR":
                if(prts.length == 3){
                    command["input"] = line.match(portRegex).slice(0, 2)
                } else {
                    command["input"] = line.match(portRegex).slice(0, 1)
                    command["value"] = parseInt(line.match(digitRegex))
                }
                break;
            case "LSHIFT":
            case "RSHIFT":
                command["input"] = line.match(portRegex).slice(0, 1)
                command["value"] = parseInt(line.match(digitRegex))
                break;
            case "NOT":
                if(prts.length == 2){
                    command["input"] = line.match(portRegex).slice(0, 1)
                } else {
                    setValue(command["output"], hexNot(parseInt(line.match(digitRegex))))
                }
            case "ASSIGNMENT":
                if(prts.length == 2){
                    command["input"] = line.match(portRegex).slice(0, 1)
                } else {
                    setValue(command["output"], parseInt(line.match(digitRegex)))
                }

        }
        commands.push(command)
        
})


let doneIterating = false;

while (!doneIterating) {
    doneIterating = true;
    for (let i=0; i<commands.length; i++){
        command = commands[i]
        prts = ((command["input"] != undefined) ? command["input"] : [])
        if (prts.reduce((e, r) =>  e && valueDefined(r), true) 
            && !valueDefined(command["output"]))  // check if the value of all input ports is defined and output is undefined
        {
            doneIterating = false;
            switch(command["operation"]) {
                case "AND":
                    if(prts.length == 2){
                        setValue(command["output"], hexAnd(getValue(prts[0]),    getValue(prts[1])))
                    } else {
                        setValue(command["output"], hexAnd(getValue(prts[0]),    command["value"]))
                    }
                    break;
                case "OR":
                    if(prts.length == 2){
                        setValue(command["output"], hexOr(getValue(prts[0]),    getValue(prts[1])))
                    } else {
                        setValue(command["output"], hexOr(getValue(prts[0]),    command["value"]))
                    }
                    break;
                case "LSHIFT":
                    setValue(command["output"], hexLeftShift(getValue(prts[0]),command["value"]));
                    break;
                case "RSHIFT":
                    setValue(command["output"], hexRightShift(getValue(prts[0]),command["value"]));
                    break;
                case "NOT":
                    setValue(command["output"], hexNot(getValue(prts[0])));
                    case "ASSIGNMENT":
                        setValue(command["output"], getValue(prts[0]));
                    }    
        }
    }
}
                        
                        
                        
                        
                        



function dec2hex(dec) {

    bin = (dec >>> 0).toString(2);
    while (bin.length < 16) {
        bin = '0' + bin;
    }
    return bin
}

function hexRightShift(n, shftval) {
    bin = dec2hex(n)
    head = bin.substr(0, 16-shftval)
    tail = ''
    for (let i=0; i<shftval; i++){
        tail+='0'
    }
    return parseInt(tail + head, 2)
}

function hexLeftShift(n, shftval) {
    bin = dec2hex(n)
    head = ''
    for (let i=0; i<shftval; i++){
        head+='0'
    }
    tail = bin.substr(shftval)
    return parseInt(tail + head, 2)
}

function hexAnd(n, m) {
    binN = dec2hex(n)
    binM = dec2hex(m)
    returnValue = ''

    for (let i=0; i<binN.length; i++) {
        if (binM[i] == '1' && binN[i] == '1') {
            returnValue = returnValue + '1';
        } else {
            returnValue = returnValue + '0';
        }
    }
    return parseInt(returnValue, 2)
}

function hexOr(n, m) {
    binN = dec2hex(n)
    binM = dec2hex(m)
    returnValue = ''

    for (let i=0; i<binN.length; i++) {
        if (binM[i] == '1' || binN[i] == '1') {
            returnValue = returnValue + '1';
        } else {
            returnValue = returnValue + '0';
        }
    }

    return parseInt(returnValue, 2)
}

function hexNot(n) {
    binN = dec2hex(n)
    returnValue = ''

    for (let i=0; i<binN.length; i++) {
        if (binN[i] == '1') {
            returnValue = returnValue + '0';
        } else {
            returnValue = returnValue + '1';
        }
    }

    return parseInt(returnValue, 2)
}


console.log(getValue('a'));






