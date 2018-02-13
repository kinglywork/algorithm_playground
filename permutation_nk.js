const n = 16;
const k = 344444;

const stepMul = (n) => [...Array(n).keys()].map(i => i + 1).reduce((accu, next) => accu * next, 1);

const max = stepMul(n);
if (k > max) {
  throw new Error(`wrong k. max k is: ${max}`);
}

const root = {};
const range = [];
for (let i = 0; i < n; i++) {
  range.push(i + 1);
}

let s = stepMul(n - 1);
root.children = range.map((i, index) => ({
  parent: root,
  value: i,
  used: [i],
  left: range.filter(e => e !== i),
  level: n,
  min: index * s + 1,
  max: (index + 1) * s
}));

let resultNode;

const queue = [];
root.children.forEach(c => queue.push(c));

while (queue.length > 0) {
  let n = queue.shift();
  if (n.left.length === 0) {
    resultNode = n;
    continue;
  }
  s = stepMul(n.level - 2);
  n.children = n.left.map((i, index) => ({
    parent: n,
    value: i,
    used: [...n.used, i],
    left: n.left.filter(e => e !== i),
    level: n.level - 1,
    min: index * s + n.min,
    max: (index + 1) * s + n.min - 1
  }));

  if (k < n.min || k > n.max) {
    continue;
  }
  n.children.forEach(c => queue.push(c));
}

const result = [resultNode.value];
let tempNode = resultNode;
while (tempNode.parent) {
  tempNode = tempNode.parent;
  if (tempNode.value) {
    result.push(tempNode.value);
  }
}
console.log(result.reverse());
