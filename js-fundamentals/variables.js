//Hoisting variable concepts

//var is hoisted but undefined
console.log(var_name); // log undefined
var var_name = "Krupal";
console.log(var_name); // log name perfectly

//let and const are hoisted to the top of the block, but not initialized.
console.log(let_name); // will give reference error
let let_name = "Krupal";
console.log(let_name); // log name perfectly

console.log(const_name); // will throw syntax error
const const_name = "Krupal";
console.log(const_name); // log name perfectly
