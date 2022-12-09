var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");
var parsedInput = input.split(/\r?\n/);

class TreeNode {
  constructor(val, size, children) {
      this.val = (val===undefined ? 0 : val);
      this.size = (size===undefined ? 0 : size);
      this.children = (children===undefined ? {} : children);
  }
}

// Build tree
function buildFs(arr) {
  const root = new TreeNode("/", 0);
  let current = root;
  let history = [];
  let i = 1;

  while (i < arr.length) {
    const line = arr[i];
    if (line.startsWith("$")) {
      const cmd = line.split(" ");
      if (cmd[1] === "cd") {
        if (cmd[2] !== "..") {
          history.push(current);
          current = current.children[cmd[2]];
        } else {
          current = history.pop();
        }
      }
    } else if (line.startsWith("dir")) {
      const newDir = line.substring(4);
      const child = new TreeNode(newDir, 0);
      
      current.children[newDir] = child;
    } else {
      const [size, newDir] = line.split(" ");

      current.children[newDir] = Number(size);
      current.size += Number(size);
      history.forEach((dir) => dir.size += Number(size));
    }

    i++;
  }

  return root;
}

// Part 1
function getSize(tree) {
  let folderSize = (tree.size <= 100000) ? tree.size : 0;

  if (tree.children === {}) {
    return folderSize;
  }

  let children = Object.values(tree.children).reduce((sum, child) => {
    if (typeof child !== "number") {
      return (sum + getSize(child));
    } else {
      return sum;
    }
  }, 0);
  return folderSize + children;
}

// Part 2
function freeSpace(fs, target) {
  // directory should be at least size min
  const min = fs.size - target;
  // smallest directory so far
  let smallest = fs.size;
  let queue = [fs];

  if (fs.children === {}) {
    return smallest;
  }

  // find smallest dir where size is >= target
  while (queue.length > 0) {
    const child = queue.shift();
    if (typeof child !== "number") {
      if (child.size >= min && child.size < smallest) {
        smallest = child.size;
      }
      queue.push(...Object.values(child.children))
    }
  }
  
  return smallest;
}

const fileSystem = buildFs(parsedInput);

console.log(getSize(fileSystem));
console.log(freeSpace(fileSystem, 70000000 - 30000000));
