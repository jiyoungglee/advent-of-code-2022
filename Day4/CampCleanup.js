var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");
var parsedInput = input.split(/\r?\n/);

function completeOverlap(arr) {
  // ["8-13", "10-65"],["13-23", "14-24"]...
  const pairs = arr.map((str) => str.split(","));

  let count = 0;

  pairs.forEach((pair) => {
    const [range1, range2] = pair.map((str) => str.split("-"));

    if ((Number(range1[0]) <= Number(range2[0]) && Number(range1[1]) >= Number(range2[1])) || (Number(range2[0]) <= Number(range1[0]) && Number(range2[1]) >= Number(range1[1]))) {
      count++;
    }
  })

  return count;
}

// Part 2
function anyOverlap(arr) {
  const pairs = arr.map((str) => str.split(","));

  let count = 0;

  pairs.forEach((pair) => {
    const [range1, range2] = pair.map((str) => str.split("-"));

    if ((Number(range1[0]) <= Number(range2[0]) && Number(range2[0]) <= Number(range1[1])) || (Number(range2[0]) <= Number(range1[0]) && Number(range1[0]) <= Number(range2[1]))) {
      count++;
    }
  })

  return count;
}

console.log(completeOverlap(parsedInput));
console.log(anyOverlap(parsedInput));
