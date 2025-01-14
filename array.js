const friends = [
  "Krupal",
  "Bobby",
  "Surya",
  "Aditya",
  "Aryan",
  "Rahul",
  "Shalin",
];

//It behaves just like toString(), but in addition you can specify the separator:
console.log(`join :${friends.join(" ")}\n`);

//removes the first array element and "shifts" all other elements to a lower index.
console.log(`shift :${friends.shift()}\n`);

//method adds a new element to an array (at the beginning), and "unshifts" older elements:
//return length of updated array
console.log(`unshift :${friends.unshift("Yatharth", "Priyansh")}\n`);

const internsGroup = [
  ["Krupal", "Aditya"],
  ["Bobby", "Surya"],
  ["Aryan", "Rahul"],
];

//method creates a new array with sub-array elements concatenated to a specified depth
console.log(`flat :`);
console.log(internsGroup.flat());

const sentences = ["hello world", "flat map is great", "javascript rules"];
console.log(
  `flatMap :${sentences.flatMap((sentence) => sentence.split(" "))}\n`
);

//searching in array

//method searches an array for an element value and returns its position.
//returns -1 if the item is not found.
console.log(`\nindexOf :${friends.indexOf("Aryan")}\n`);

//lastIndexOf() is the same as indexOf(), but returns the position of the last occurrence of the specified element.

// allows us to check if an element is present in an array
console.log(`includes :${friends.includes("Rahul")}`);
console.log(`includes :${friends.includes("Rahu")}\n`);

//returns the value of the first array element that passes a test function
console.log(
  `find :${friends.find((e) => {
    if (e.includes("a")) return e;
  })}`
);

console.log(
  `findIndex :${friends.findIndex((e) => {
    if (e.includes("l")) {
      return e;
    }
  })}\n`
);

//executes functions on each elements
//parameter (currentElement, index, arr)
//return undefined
friends.forEach((item, index, arr) => {
  arr[index] = item.length;
});
console.log(`forEach :${friends}\n`);

//executes functions on each and every element if this function is applicable on each functions then it return true else false
//parameter (currentElement, index, arr)
//return true or false
const experiences = [20, 21, 25, 24, 22, 21];
console.log(
  `every :${experiences.every((e) => {
    return e >= 20;
  })}`
);

console.log(
  `every :${experiences.every((e) => {
    return e > 20;
  })}\n`
);

//checks if any array elements pass a test
//executes the callback function once for each array element.
//returns true (and stops) if the function returns true for one of the array elements.
//returns false if the function returns false for all of the array elements.
console.log(`some :${experiences.some((item) => item > 20)}`);
console.log(`some :${experiences.some((item) => item < 20)}\n
`);

//creates a new array filled with elements that pass a test provided by a function.
//does not execute the function for empty elements
//does not change the original array.
//parameter (currentElement, index, arr)
//return filtered array
console.log(`filter :${experiences.filter((e) => e > 21)}\n`);

//creates a new array by performing a function on each array element.
//does not execute the function for array elements without values.
//does not change the original array.
console.log(`map :${experiences.map((e) => (e += 2))}\n`);

//The methods reduce() and reduceRight() in JavaScript are both used to reduce an array to a single value by applying a function across the array’s elements
//reduce() traverse form left to right
//reduceRight() traverse from right to left
const krupalExperience = [1, 1, 3, 2];
console.log(
  `reduce :${krupalExperience.reduce((acc, item) => (acc += item), 0)}`
);

//sorting
//affect original array
//use toSorted and toReversed this method return new array rather then chnaging the original one
console.log(`sort :${krupalExperience.sort()}`);
console.log(`sort descending :${krupalExperience.sort((a, b) => b - a)}`);
console.log(`reverse :${krupalExperience.reverse()}`);


