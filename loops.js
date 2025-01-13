//repeating until the condition is going to met
console.log("While");
let i = 0;
while (true) {
  console.log(i);
  if (i === 6) {
    console.log("Terminated");
    break;
  }
  i++;
}

//number of iteration is going to known
console.log("\nfor");
for (let j = 0; j < 5; j++) {
  console.log(j);
}

//Iterating over object keys
console.log("\nfor...in");
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
for (let key in obj) {
  console.log(key);
}

//iterating over array elements
console.log("\nfor...of");
for (let key of ["Krupal", "Bobby", "Surya", "Aryan", "Aditya"]) {
  console.log(key);
}

for (let [one, two] of [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
]) {
  console.log(one + " " + two);
}
