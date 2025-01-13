//scopes of var and let variables

//var is function scoped
function var_fun(name) {
  if (name === "Krupal") {
    var surname = "Patel";
  } else {
    surname = "Upreti";
  }

  console.log(name + " " + surname);
}

console.log("Var function :");
var_fun("Krupal");
var_fun("Bobby");

//let is block scoped
function let_fun(name) {
  if (name === "Krupal") {
    let surname = "Patel";
  } else {
    surname = "Upreti";
  }

  console.log(name + " " + surname);

  //it throws surname is not defined refrence error as
  //let is block based so it scope is only up to if block
}

console.log("\nlet function :");
let_fun("Krupal");
let_fun("Bobby");
