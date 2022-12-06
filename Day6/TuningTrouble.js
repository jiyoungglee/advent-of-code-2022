var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");

function findStart(str, marker) {
  const chars = {};
  let unique = 0;

  for (let i=0; i<str.length; i++) {
    if (unique === marker) {
      return i;
    } else if (!(str[i] in chars)) {
      chars[str[i]] = i;
      unique++;
    } else if (str[i] in chars) {
      Object.keys(chars).forEach((char) => {
        if (chars[char] < chars[str[i]]) {
          delete chars[char];
          unique--;
        }
      })
      chars[str[i]] = i;
    }
  }
};

// Part 1: start marker @ 4 distinct characters
console.log(findStart(input, 4));
// Part 2: start marker @ 14 distinct characters
console.log(findStart(input, 14));
