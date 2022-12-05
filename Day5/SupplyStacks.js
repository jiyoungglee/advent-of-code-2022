var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");
var parsedInput = input.split(/\r?\n/);

// Part 1
function moveOne(arr) {
  let stacks = {};
  let i = 0;

  // build the stacks
  while(arr[i][1] !== "1") {
    const line = arr[i];
    let position = 1;

    // for every character j+=4 starting from 1
    // add non-space character to beginning of array at position
    for (let j=1; j < line.length; j+=4) {
      const crate = line[j]
      if (crate !== " ") {
        if (!stacks[position]) {
          stacks[position] = [crate]
        } else {
          stacks[position] = [crate,...stacks[position]]
        }
      }
      position++; 
    }
    i++;
  }

  // compile the instructions
  // 1. times to execute pop & push
  // 2. stack to pop from 
  // 3. stack to push to

  for (let inx=i+2; inx < arr.length; inx++) {
    // convert instructions to array of numbers
    const [times, from, to] = arr[inx].replace("move ","").replace("from ", "").replace("to ", "").split(" ").map(n => Number(n));

    for (let e=0; e < times; e++) {
      stacks[to].push(stacks[from].pop());
    }
  }

  let message = "";
  // return top of stacks
  for (let stack in stacks) {
    message += stacks[stack].pop();
  }

  return message;
}

// Part 2
function moveMany(arr) {
  let stacks = {};
  let i = 0;

  // build the stacks
  while(arr[i][1] !== "1") {
    const line = arr[i];
    let position = 1;

    // for every character j+=4 starting from 1
    // add non-space character to beginning of array at position
    for (let j=1; j < line.length; j+=4) {
      const crate = line[j]
      if (crate !== " ") {
        if (!stacks[position]) {
          stacks[position] = [crate]
        } else {
          stacks[position] = [crate,...stacks[position]]
        }
      }
      position++; 
    }
    i++;
  }

  // compile the instructions
  // 1. number of crates
  // 2. stack to slice from 
  // 3. stack to push to

  for (let inx=i+2; inx < arr.length; inx++) {
    // convert instructions to array of numbers
    const [num, from, to] = arr[inx].replace("move ","").replace("from ", "").replace("to ", "").split(" ").map(n => Number(n));

    stacks[to].push(...stacks[from].splice(0-num));
  }

  let message = "";
  // return top of stacks
  for (let stack in stacks) {
    message += stacks[stack].pop();
  }

  return message;
}

console.log(moveOne(parsedInput));
console.log(moveMany(parsedInput));
