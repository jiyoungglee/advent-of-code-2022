var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");
var parsedInput = input.split(/\r?\n/);

// Part 1
const mostCalories = (arr) => {
  let richest = 0;
  let current = 0;

  arr.forEach((item) => {
    if (item === "") {
      if (current > richest) {
        richest = current;
      }
      current = 0;
    } else {
      current += Number(item);
    }
  })

  if (current > richest) {
    return current;
  } else {
    return richest;
  }
}

// Part 2
const topThree = (arr) => {
  let top3 = [];
  let current = 0;

  const replaceMin = (num) => {
    const min = Math.min(...top3);

    if (num > min) {
      const index = top3.indexOf(min);
      top3[index] = num;
    }
  }

  arr.forEach((item) => {
    if (item === "") {
      if (top3.length < 3) {
        top3.push(current);
      } else if (top3.length === 3) {
        replaceMin(current);
      }
      current = 0;
    } else {
      current += Number(item);
    }
  })

  return top3.reduce((total, num) => total + num, 0);
};

console.log(mostCalories(parsedInput));
console.log(topThree(parsedInput));
