//functions

// named function (Declaration)
function greet(name) {
  return `Hello, ${name}`;
}
console.log(greet("Krupal"));

//anonymous (Expression)
const anonymousGreet = function (name) {
  return `Hello anonymous, ${name}`;
};
console.log(anonymousGreet("Krupal"));

//function with name (Expression)
const nameGreet = function expNameGreet(name) {
  return `Hello exp greet ${name}`;
};
console.log(nameGreet("Krupal"));

//arrow

const arrowGreet = (name) => {
  return `Hello arrow, ${name}`;
};
console.log(arrowGreet("Krupal"));

//iife
(function () {
  console.log("IIFE executed");
})();

//Higher Order Function
function higherOrder(fn) {
  return function (name) {
    return fn(name).toUpperCase();
  };
}

const loudGreet = higherOrder(arrowGreet);
console.log(loudGreet("Krupal"));
