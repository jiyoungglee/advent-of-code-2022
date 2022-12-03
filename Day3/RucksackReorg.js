var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");
var parsedInput = input.split(/\r?\n/);

function reorg(arr) {
  let sum = 0;

  // loop through first half
  arr.forEach((sack) => {
    let half = {};

    // compartment 1
    for (let i=0; i < sack.length/2; i++) {
      const char = sack[i];
      if (!half[char]) {
        half[char] = (char === char.toUpperCase()) ? (char.charCodeAt(0) - 38) : (char.charCodeAt(0) - 96);
      }
    }

    // compartment 2
    for (let j=sack.length/2; j < sack.length; j++) {
      const char = sack[j]
      if (half[char]) {
        sum += half[char];
        break;
      }
    }
  })

  return sum;
}

// Part 2
function byGroup(arr) {
  let sum = 0;
  let counter = 1;
  let tracker = {};

  arr.forEach((sack) => {
    for (let i=0; i < sack.length; i++) {
      const char = sack[i];
      if (counter === 1) {
        if (!tracker[char]) {
          tracker[char] = 1;
        }
      } else if (counter === 2) {
        if (tracker[char] === 1) {
          tracker[char]++;
        }
      } else if (counter === 3) {
        if (tracker[char] === 2) {
          sum += (char === char.toUpperCase()) ? (char.charCodeAt(0) - 38) : (char.charCodeAt(0) - 96);
          break;
        }
      }
    }

    if (counter < 3) {
      counter++;
    } else {
      // start new group
      counter = 1;
      tracker = {};
    }
  })

  return sum;
}

console.log(reorg(parsedInput));
console.log(byGroup(parsedInput));
