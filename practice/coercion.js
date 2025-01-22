console.log("5" + 3); // "53" (string "5" + number 3 -> string "53")
console.log(3 + "5"); // "35" (number 3 + string "5" -> string "35")
console.log("5" + "3"); // "53" (string "5" + string "3" -> string "53")
console.log(5 + 3); // 8 (number + number -> sum)

console.log("Hello " + true); // "Hello true" (true is coerced to the string "true")
console.log("The answer is " + false); // "The answer is false" (false is coerced to the string "false")

console.log(5 == "5"); // true (string "5" is coerced to number 5)
console.log(0 == false); // true (false is coerced to 0)
console.log(null == undefined); // true (both are treated as "nullish" values)

console.log(+"123"); // 123 (string "123" is converted to number 123)
console.log(+"Hello"); // NaN (string "Hello" can't be converted to a number)
console.log(+true); // 1 (boolean true is coerced to number 1)
console.log(+false); // 0 (boolean false is coerced to number 0)
console.log(+undefined); // NaN (undefined can't be coerced to a number)
console.log(+null); // 0 (null is coerced to 0)

console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean("hello")); // true (non-empty string is truthy)
console.log(Boolean({})); // true (non-empty object is truthy)
console.log(Boolean([])); // true (non-empty array is truthy)

console.log(Number("123")); // 123 (string "123" is converted to number)
console.log(Number("123abc")); // NaN (non-numeric string results in NaN)
console.log(Number(true)); // 1 (boolean true is coerced to number 1)
console.log(Number(false)); // 0 (boolean false is coerced to number 0)
console.log(Number(null)); // 0 (null is coerced to 0)
console.log(Number(undefined)); // NaN (undefined can't be converted to a number)
console.log(Number("")); // 0 (empty string is coerced to 0)

let obj1 = {
  valueOf() {
    return 10;
  },
};
console.log(5 + obj1); // 15 (obj1 is coerced to its primitive value 10 using valueOf())

let obj2 = {
  toString() {
    return "Hello";
  },
};
console.log("World " + obj2); // "World Hello" (obj2 is coerced to string using toString())

// Addition (+) → Coerces to String if one of the operands is a string.
// Arithmetic operations (-, *, /) → Coerces to Number.
// Equality (==) → Coerces values to the same type before comparison.
// Boolean context (in if, while) → Coerces values to true or false (truthy or falsy).
// Object operations → Coerces objects to strings using toString() or valueOf() methods
