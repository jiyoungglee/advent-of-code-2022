var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");
var parsedInput = input.split(/\r?\n/);

//Part 1
function byShape(arr) {

  // Rock: 1, A, X
  // Paper: 2, B, Y
  // Scissors: 3, C, Z

  // Loss: 0;
  // Draw: 3;
  // Win: 6;

  const map = {
    "A": { "X": 1 + 3, "Y": 2 + 6, "Z": 3 + 0 },
    "B": { "X": 1 + 0, "Y": 2 + 3, "Z": 3 + 6 },
    "C": { "X": 1 + 6, "Y": 2 + 0, "Z": 3 + 3 }
  }

  const pairs = arr.map((pair) => pair.split(" "));
  let score = 0;

  pairs.forEach((game) => {
    score += map[game[0]][game[1]];
  })

  return score;
}

// Part 2
function byOutcome(arr) {

  // Rock: 1, A, X
  // Paper: 2, B, Y
  // Scissors: 3, C, Z

  // Loss: 0, X
  // Draw: 3, Y
  // Win: 6, Z

  const map = {
    "A": { "X": 0 + 3, "Y": 3 + 1, "Z": 6 + 2 },
    "B": { "X": 0 + 1, "Y": 3 + 2, "Z": 6 + 3 },
    "C": { "X": 0 + 2, "Y": 3 + 3, "Z": 6 + 1 }
  }

  const pairs = arr.map((pair) => pair.split(" "));
  let score = 0;

  pairs.forEach((game) => {
    score += map[game[0]][game[1]];
  })

  return score;
}

console.log(byShape(parsedInput));
console.log(byOutcome(parsedInput));
