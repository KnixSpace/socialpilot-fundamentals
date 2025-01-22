const numSet = new Set([2, 1, 2, 4, 1, 5, 6, 7, 8, 7]);
console.log(numSet);

const objSet = new Set();
const obj = {
  firstName: "Krupal",
  lastName: "Patel",
  profile: {
    exp: 2,
    age: 21,
  },
};

const objCopy = obj;
const objShallowCopy = Object.assign({}, obj);
const objDeepCopy = structuredClone(obj);

objSet.add(obj);
console.log("\nOrigial Obj added :", objSet);

objSet.add(obj);
console.log("\nDirect Copy Obj added :", objSet);

objSet.add(objShallowCopy);
console.log("\nShallow Copy Obj added :", objSet);

objSet.add(objDeepCopy);
console.log("\nDeep Copy Obj added :", objSet);

//set is not index based accesible as it use min heap
console.log("\nSet is not index based accesible");
console.log(numSet[0]);

//we can use for...of or set inbuilt forEach method
console.log("\nIterating Set using for...of");
for (let i of numSet) {
  console.log(i);
}

console.log("\nIterating Set using inbuilt forEach method");
numSet.forEach((a) => {
  console.log(a);
});

//entries retrun an iterator
//interating over set using next
//done is boolean indecates if true if we reached the last element in set
console.log("\nentries, next, done :");
const itSet = new Set([4, 1, 6, 1]);
const iterator = itSet.entries();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//checking existence of an element in set
console.log("\nhas :");
console.log(numSet.has(10));
console.log(numSet.has(2));
